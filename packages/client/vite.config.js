import { resolve } from 'node:path'
import { cwd } from 'node:process'

import { defineConfig, loadEnv } from 'vite'

import { generateEnv, generatePlugins, generateProxy } from './vite'

export default defineConfig(({ mode }) => {
  const env = generateEnv(loadEnv(mode, cwd()))

  const {
    VITE_BASE,
    VITE_HTTPS,
    VITE_DROP_CONSOLE,
    VITE_SOURCEMAP,
    VITE_OPEN,
    VITE_PORT,
    VITE_PROXY,
  } = env

  return {
    root: cwd(),
    base: VITE_BASE || '/',
    plugins: generatePlugins({ mode, env }),
    resolve: {
      alias: {
        '@': resolve(cwd(), 'src'),
        '~': resolve(cwd()),
      },
    },
    server: {
      host: true,
      https: VITE_HTTPS,
      open: VITE_OPEN,
      port: VITE_PORT || 5173,
      proxy: generateProxy(VITE_PROXY),
    },
    preview: {
      port: VITE_PORT || 5173,
      proxy: generateProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'esnext',
      chunkSizeWarningLimit: 2000,
      sourcemap: VITE_SOURCEMAP,
    },
  }
})
