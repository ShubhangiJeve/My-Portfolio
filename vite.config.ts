import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/My-Portfolio/' : '/',

  plugins: [react()],

  build: {
    // Target modern browsers — smaller output, no legacy polyfills
    target: 'es2020',

    // Raise chunk warning threshold (project data is intentionally large)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Manual chunk splitting — separates vendor code from app code
        // Browsers can cache vendor chunks across deploys
        manualChunks(id) {
          // React core — changes rarely, long cache life
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          // Router — changes rarely
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // ProjectDetail + its data are only needed on /projects/:id
          if (id.includes('ProjectDetail') || id.includes('projectsData')) {
            return 'chunk-project-detail';
          }
        },
        // Consistent hashed filenames for long-term caching
        entryFileNames:  'assets/[name]-[hash].js',
        chunkFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },

    // Keep CSS in separate files per chunk — avoids flash of unstyled content
    cssCodeSplit: true,

    // Source maps in production are useful for debugging deployed errors
    sourcemap: false,

    // Minification — Vite 8 uses OXC by default (esbuild is no longer bundled)
    minify: 'oxc',
  },

  // Pre-bundle these so the browser doesn't see waterfalls of module requests in dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
});
