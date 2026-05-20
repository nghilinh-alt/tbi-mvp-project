import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    hmr: {
      overlay: false,
    },
  },
  // Enable JSX for .jsx and .tsx files with React.jsxFilenamePragma
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
  },
});
