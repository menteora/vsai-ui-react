
# @menteora/vsai-ui-react

Una libreria di componenti React di alta qualità, progettata con un'estetica professionale e un'architettura **AI-Native**. 

## ✨ Caratteristiche Principali

- 💎 **Estetica High-End**: Design moderno con effetti Frosted Glass, ombreggiature morbide e icone Lucide integrate.
- 🌓 **Supporto Temi**: Supporto nativo per modalità Light e Dark su ogni componente.
- 🚀 **Modulare & Leggera**: Esportazioni singole per favorire il tree-shaking.
- 🤖 **AI-Ready**: Metadati (`*Docs`) esportati per l'integrazione con agenti AI.

## 📦 Installazione

Puoi installare la libreria direttamente da GitHub. È necessario includere anche `lucide-react` come dipendenza:

```bash
npm install github:menteora/vsai-ui-react lucide-react
```

O aggiungendola manualmente al `package.json`:

```json
{
  "dependencies": {
    "@menteora/vsai-ui-react": "github:menteora/vsai-ui-react",
    "lucide-react": "^0.475.0"
  }
}
```

## 🎨 Configurazione Tailwind CSS

Per visualizzare correttamente gli stili dei componenti, configura Tailwind per scansionare il pacchetto nei tuoi file CSS:

```css
/* Nel tuo file globals.css o index.css */
@import "tailwindcss";
@source "../node_modules/@menteora/vsai-ui-react/dist";
```

## 🚀 Quick Start

```tsx
import { VSAIButton, VSAIToolbar } from '@menteora/vsai-ui-react';

const App = () => (
  <>
    <VSAIToolbar title="My Professional App" theme="light" />
    <main className="p-8">
      <VSAIButton 
        label="Inizia Ora" 
        variant="primary" 
        onClick={() => console.log('Action!')} 
      />
    </main>
  </>
);
```

---
© 2024 Menteora UI Labs.
