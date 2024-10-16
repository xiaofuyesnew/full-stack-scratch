import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig({
  plugins: [
    ...VitePluginNode({
      adapter: 'koa',
      appPath: './src/main.js',
      exportName: 'viteNodeApp',
      initAppOnBoot: false,
      tsCompiler: 'esbuild',
    }),
  ],
  server: {
    port: 3000,
    hmr: true,
  },
  build: {
    target: 'esnext',
    minify: true,
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'app.js',
      },
    },
  },
})
