import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // Absolute path so outDir is relative to the project root, not public/
    outDir: path.resolve(__dirname, 'gas'),
    // Don't wipe gas/ on build — server .js files live there too
    emptyOutDir: false,
    // lightningcss (Vite 8 default) chokes on CSS vars inside calc() in media queries (Buefy)
    cssMinify: false,
  },
})
