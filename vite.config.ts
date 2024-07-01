import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/layouts'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  plugins: [react()],
});
