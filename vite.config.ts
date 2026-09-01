import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' faz o site funcionar tanto na raiz de um domínio
// quanto em https://usuario.github.io/nome-do-repo/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false },
});
