import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Убеждаемся что переменные окружения с префиксом VITE_ доступны в клиенте
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
  server: {
    port: 5173,
    host: true
  }
})
