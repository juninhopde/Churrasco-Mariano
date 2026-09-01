import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Build alternativo: gera um bundle IIFE (sem módulos ES) para que o site
 * funcione até abrindo o arquivo direto do disco, com clique duplo.
 * Usado pelo script "build:arquivo-unico".
 */
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist-single',
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'bundle.js', assetFileNames: 'bundle.[ext]' },
    },
  },
});
