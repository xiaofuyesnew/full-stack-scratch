import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import settings from './src/settings'

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      adapter: 'koa',
      appPath: './src/main.js',
      exportName: 'viteNodeApp',
      initAppOnBoot: false,
      tsCompiler: 'esbuild',
      outputFormat: 'es',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(cwd(), 'src'),
      '~': resolve(cwd()),
    },
  },
  server: {
    port: settings.port,
    hmr: true,
  },
  build: {
    target: 'esnext',
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app.js',
      },
    },
  },
})
