import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@repo/ui': path.resolve('../../packages/ui/src')
    },
  },
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "widget",
      fileName: (format) => `widget.${format}.js`,
    },
    target: "esnext",
  },
})
