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
    // Embute TODAS as imagens/vídeos locais no JS (data URI). Sem isto, só arquivos < 4 KB eram
    // embutidos e a foto do Mariano ficava como "bundle.jpg" solto — quebrada quando o HTML
    // é aberto ou enviado sozinho.
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    // O pacote cresce de propósito (fotos embutidas); o aviso de 500 KB não se aplica aqui.
    chunkSizeWarningLimit: 20000,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'bundle.js', assetFileNames: 'bundle.[ext]' },
    },
  },
});
