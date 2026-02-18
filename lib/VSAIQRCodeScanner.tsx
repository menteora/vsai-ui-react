
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Theme, ComponentDocs } from './types';
import { Camera, X, RefreshCcw, ScanLine, AlertCircle } from 'lucide-react';
import jsQR from 'jsqr';

export interface VSAIQRCodeScannerProps {
  /** Controlla la visibilità del componente. Se false, spegne la fotocamera. */
  isOpen: boolean;
  /** Callback invocata quando un QR code viene letto con successo. */
  onScan: (data: string) => void;
  /** Callback invocata per chiudere il componente. */
  onClose: () => void;
  /** Tema visuale. */
  theme?: Theme;
}

export const VSAIQRCodeScannerDocs: ComponentDocs = {
  name: "VSAIQRCodeScanner",
  description: "Scanner QR Code avanzato che utilizza l'API nativa BarcodeDetector con fallback su jsQR per la massima compatibilità. Gestisce la selezione multipla delle fotocamere.",
  props: [
    { name: 'isOpen', type: 'boolean', defaultValue: 'false', description: 'Attiva lo scanner e la fotocamera.' },
    { name: 'onScan', type: '(data) => void', defaultValue: '-', description: 'Restituisce il valore letto.' },
    { name: 'onClose', type: '() => void', defaultValue: '-', description: 'Chiude lo scanner.' },
    { name: 'theme', type: '"light" | "dark"', defaultValue: '"light"', description: 'Tema visuale.' }
  ],
  prelude: `const [data, setData] = useState<string | null>(null);
const [show, setShow] = useState(true);`,
  exampleProps: {
    isOpen: "{show}",
    onScan: "(val) => { setData(val); setShow(false); }",
    onClose: "() => setShow(false)",
    theme: "light"
  }
};

export const VSAIQRCodeScanner: React.FC<VSAIQRCodeScannerProps> = ({
  isOpen,
  onScan,
  onClose,
  theme = 'light'
}) => {
  const isDark = theme === 'dark';
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<number | null>(null);

  // Load preferred camera from localStorage
  useEffect(() => {
    const savedId = localStorage.getItem('vsai_camera_id');
    if (savedId) {
      setActiveDeviceId(savedId);
    }
  }, []);

  // Enumerate devices
  const getDevices = useCallback(async () => {
    try {
      // Must request permission first to get labels
      await navigator.mediaDevices.getUserMedia({ video: true });
      const devs = await navigator.mediaDevices.enumerateDevices();
      const videoDevs = devs.filter(d => d.kind === 'videoinput');
      setDevices(videoDevs);
      
      if (videoDevs.length > 0 && !activeDeviceId) {
        // Default to the "back" camera if possible, otherwise first one
        const backCam = videoDevs.find(d => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('environment'));
        const initialId = backCam ? backCam.deviceId : videoDevs[0].deviceId;
        setActiveDeviceId(initialId);
      }
      setPermissionGranted(true);
    } catch (err) {
      setError("Permesso fotocamera negato o dispositivo non trovato.");
      setPermissionGranted(false);
    }
  }, [activeDeviceId]);

  // Start Camera Stream
  useEffect(() => {
    if (!isOpen) {
      stopStream();
      return;
    }

    if (!permissionGranted) {
      getDevices();
      return;
    }

    if (activeDeviceId) {
      startStream(activeDeviceId);
    }

    return () => {
      stopStream();
    };
  }, [isOpen, activeDeviceId, permissionGranted, getDevices]);

  const startStream = async (deviceId: string) => {
    stopStream(); // Ensure previous stream is closed
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        startScanning();
      }
    } catch (err) {
      console.error(err);
      setError("Impossibile avviare la fotocamera selezionata.");
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scanIntervalRef.current) {
      window.clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const startScanning = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    // Initialize Native BarcodeDetector if available
    let barcodeDetector: any = null;
    if ('BarcodeDetector' in window) {
      try {
        // @ts-ignore
        barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
      } catch (e) {
        console.warn('BarcodeDetector initialization failed, using jsQR');
      }
    }

    scanIntervalRef.current = window.setInterval(async () => {
      const video = videoRef.current;
      if (video && video.readyState === 4) {
        // 1. Try Native API (Faster on mobile)
        if (barcodeDetector) {
          try {
            const codes = await barcodeDetector.detect(video);
            if (codes.length > 0) {
              handleScanSuccess(codes[0].rawValue);
              return;
            }
          } catch (e) {
            // Native detection failed, continue to fallback
          }
        }

        // 2. Fallback to jsQR
        try {
          if (!canvasRef.current) {
            canvasRef.current = document.createElement('canvas');
          }
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
            });

            if (code && code.data) {
              handleScanSuccess(code.data);
            }
          }
        } catch (err) {
          // Frame processing error
        }
      }
    }, 300); // Scan every 300ms
  };

  const handleScanSuccess = (val: string) => {
    // Optional: Add simple beep or vibration here if needed
    onScan(val);
  };

  const switchCamera = (deviceId: string) => {
    setActiveDeviceId(deviceId);
    localStorage.setItem('vsai_camera_id', deviceId);
  };

  if (!isOpen) return null;

  const hasMultipleCameras = devices.length > 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className={`relative w-full max-w-md overflow-hidden rounded-[2rem] border shadow-2xl transition-all ${
        isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <ScanLine size={20} className="text-blue-400" />
              Scan QR Code
            </h3>
            <p className="text-white/70 text-xs">Inquadra il codice nel riquadro</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-black/20 text-white hover:bg-white/20 backdrop-blur-md transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-[3/4] bg-black flex flex-col items-center justify-center overflow-hidden">
          {error ? (
            <div className="text-center p-6 text-white space-y-4">
              <AlertCircle size={48} className="mx-auto text-red-500 mb-2" />
              <p className="font-bold">{error}</p>
              <button 
                onClick={getDevices} 
                className="px-4 py-2 bg-white/10 rounded-xl text-sm hover:bg-white/20"
              >
                Riprova
              </button>
            </div>
          ) : (
            <>
              <video 
                ref={videoRef} 
                className="absolute inset-0 w-full h-full object-cover" 
                muted 
                playsInline 
              />
              
              {/* Scanning Overlay UI */}
              <div className="relative z-10 w-64 h-64 border-2 border-white/30 rounded-3xl overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                 <div className="absolute inset-0 border-2 border-blue-500 rounded-3xl opacity-50"></div>
                 {/* Corner markers */}
                 <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-blue-500 rounded-tl-lg"></div>
                 <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-blue-500 rounded-tr-lg"></div>
                 <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-blue-500 rounded-bl-lg"></div>
                 <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-blue-500 rounded-br-lg"></div>
                 
                 {/* Laser Scan Animation */}
                 <div className="absolute top-0 left-0 right-0 h-1 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)] animate-[scan_2s_linear_infinite]"></div>
              </div>
            </>
          )}
        </div>

        {/* Footer / Controls */}
        <div className={`p-4 border-t flex items-center justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
              <Camera size={18} />
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {devices.find(d => d.deviceId === activeDeviceId)?.label.slice(0, 20) || 'Fotocamera'}...
            </span>
          </div>

          {hasMultipleCameras && (
            <div className="relative group">
              <select 
                value={activeDeviceId || ''}
                onChange={(e) => switchCamera(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              >
                {devices.map(dev => (
                  <option key={dev.deviceId} value={dev.deviceId}>
                    {dev.label || `Camera ${dev.deviceId.slice(0, 5)}...`}
                  </option>
                ))}
              </select>
              <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isDark 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20' 
                  : 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100'
              }`}>
                <RefreshCcw size={14} />
                Cambia
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(250px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
