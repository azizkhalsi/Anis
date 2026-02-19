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
      // These headers are for dev server only; production uses public/_headers or platform config
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://fonts.googleapis.com; frame-ancestors 'none'; base-uri 'self';",
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    },
  },
  preview: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://fonts.googleapis.com; frame-ancestors 'none'; base-uri 'self';",
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        sanitizeFileName: (name) => name.replace(/[^a-zA-Z0-9.-]/g, '_'),
        manualChunks: (id) => {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three/')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
        },
      },
    },
  },
})
