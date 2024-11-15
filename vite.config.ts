import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Backend server URL
        changeOrigin: true,               // Ensures the origin is changed for the request
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove `/api` from the path
        secure: false,                    // Set to `false` if using HTTP and not HTTPS
        logLevel: 'debug',                // Log proxy activity for debugging
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
