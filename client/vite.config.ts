import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000/', // URL вашего API
        changeOrigin: true,            // Меняет источник (Origin) запроса
        secure: false,                 // Если вы используете HTTPS и у вас есть проблемы с сертификатом
        // rewrite: (path) => path.replace(/^\/api/, ''), // Переписывает URL, если нужно
      },
    },
  },
})
