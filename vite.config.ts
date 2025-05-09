import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get the repo name from package.json or environment variables
// You may need to manually set this to your GitHub repository name
const repoName = process.env.GITHUB_REPOSITORY 
  ? process.env.GITHUB_REPOSITORY.split('/')[1] 
  : ''

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' && repoName ? `/${repoName}/` : '/',
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
