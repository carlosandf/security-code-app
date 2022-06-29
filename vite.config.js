import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components/'),
      '@containers': path.resolve(__dirname, './src/containers/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
    }
  },
  plugins: [react()]
})
