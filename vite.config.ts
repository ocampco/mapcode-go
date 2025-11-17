import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// https://vite.dev/guide/static-deploy#github-pages
export default defineConfig({
  base: '/mapcode-go/',
  plugins: [react()],
})
