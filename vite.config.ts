import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/GoogleFileWebsite/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    global: {},
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // This should be your API server address
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
