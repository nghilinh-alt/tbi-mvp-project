import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/frontend/src',
      '@employer': '/employer-portal/src',
      '@provider': '/provider-console/src',
      '@niiq': '/niiq-dashboard/src',
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/token': 'http://localhost:8000',
      '/health': 'http://localhost:8000',
      '/users': 'http://localhost:8000',
      '/journeys': 'http://localhost:8000',
      '/skills': 'http://localhost:8000',
      '/jobs': 'http://localhost:8000'
    }
  },
  build: {
    outDir: 'dist'
  }
});
