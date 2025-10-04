import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  // Ensure JSON files are bundled inline, not fetched via network
  json: {
    stringify: false, // Import as parsed object, not string
  },
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            return 'vendor';
          }
        },
      },
    },
    // Increase chunk size warning limit (JSON data is large)
    chunkSizeWarningLimit: 1500,
  },
})
