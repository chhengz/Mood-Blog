import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      proxy: {
        '/api/v1': {
          target: env.VITE_API_URL,
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
          },
          changeOrigin: true,
        },
      },
    },
  }
})
