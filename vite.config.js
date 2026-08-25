import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Don't scan api/ for dependencies — they are Vercel serverless functions
  optimizeDeps: {
    exclude: ['mongoose', 'resend', 'jsonwebtoken', 'cookie'],
    // Only crawl the src directory, not the whole project root
    entries: ['src/**/*.{js,jsx,ts,tsx}'],
  },

  server: {
    // Proxy /api/* to Vercel CLI dev server during local development
    // Run `npx vercel dev` in a separate terminal to start the API server
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})