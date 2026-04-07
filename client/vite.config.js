import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Supprime les warnings de dépreciation qui viennent de Bootstrap
        silenceDeprecations: [
          'import',
          'if-function', 
          'global-builtin',
          'color-functions',
        ],
      },
    },
  },
});