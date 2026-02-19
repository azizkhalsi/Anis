import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Security: Ensure proper MIME types and headers
  server: {
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
    // Ensure production build is secure
    minify: 'esbuild',
    sourcemap: false, // Set to true only if needed for debugging
    rollupOptions: {
      output: {
        // Sanitize chunk names to avoid XSS risks
        sanitizeFileName: (name) => name.replace(/[^a-zA-Z0-9.-]/g, '_'),
      },
    },
  },
})
