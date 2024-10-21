import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd())

  return {
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
      port: env.VITE_PORT || 3000,
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
  }
})
