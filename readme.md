# @menteora/vsai-ui-react

Una libreria di componenti React di alta qualità, progettata con un'estetica professionale e un'architettura **AI-Native**. 

## ✨ Caratteristiche Principali

- 💎 **Estetica High-End**: Design moderno con effetti Frosted Glass, ombreggiature morbide e icone Lucide integrate.
- 🌓 **Supporto Temi**: Supporto nativo per modalità Light e Dark su ogni componente.
- 🚀 **Modulare & Leggera**: Esportazioni singole per favorire il tree-shaking e minimizzare il bundle size.
- 🤖 **AI-Ready**: Ogni componente esporta metadati (`*Docs`) per permettere a modelli linguistici (LLM) di comprendere e generare codice corretto dinamicamente.
- 📱 **Fully Responsive**: Componenti complessi (come `VSAITable`) si adattano automaticamente ai dispositivi mobile.

## 📦 Installazione

```bash
npm install @menteora/vsai-ui-react
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

## 🛠 Sviluppo e Build

La libreria utilizza `tsup` per una compilazione ultra-veloce e generazione di definizioni TypeScript.

```bash
npm run build # Genera la cartella /dist con formati ESM e CJS
npm run dev   # Avvia la modalità watch per lo sviluppo
```

## 🧠 Filosofia AI-Native

A differenza delle librerie standard, `@menteora/vsai-ui-react` fornisce oggetti di documentazione a runtime. Esempio: `VSAILoginDocs` contiene lo schema delle props e descrizioni testuali che possono essere fornite ai prompt degli agenti AI per generare interfacce coerenti senza errori di validazione.

---
© 2024 Menteora UI Labs.