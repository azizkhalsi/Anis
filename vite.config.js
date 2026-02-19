import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Strip @vite/client from index.html in dev so the browser never tries to open
// the HMR WebSocket (avoids "Connection failed" when it can't connect).
function stripViteClient() {
  return {
    name: 'strip-vite-client',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(/<script type="module" src="\/@vite\/client"><\/script>\s*/i, '')
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [stripViteClient(), tailwindcss(), react()],
  // Security: Ensure proper MIME types and headers
  server: {
    hmr: false,
    headers: {
      // These headers are for dev server only
      // For production, configure headers in your hosting platform (see docs/DEPLOYMENT-SECURITY.md)
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        sanitizeFileName: (name) => name.replace(/[^a-zA-Z0-9.-]/g, '_'),
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
