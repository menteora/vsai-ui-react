
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts', 'lib/VSAI*.tsx'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  external: ['react', 'react-dom', 'lucide-react'],
  outDir: 'dist'
});
