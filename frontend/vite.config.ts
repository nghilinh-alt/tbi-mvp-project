import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    middlewareMode: false,
    hmr: { overlay: false },
  },
  build: {
    outDir: 'dist',
  },
})
