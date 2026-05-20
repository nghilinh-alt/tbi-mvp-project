/**
 * Tailwind CSS v4 Configuration
 * 
 * Standard stack for TBI MVP projects (2025-01):
 * - React 19
 * - TypeScript  
 * - Vite
 * - Tailwind CSS v4 (via @tailwindcss/cli)
 * - shadcn/ui
 * - Lucide icons
 * 
 * Optional: Framer Motion, Radix UI
 */

import type { Config } from '@tailwindcss/v4'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
