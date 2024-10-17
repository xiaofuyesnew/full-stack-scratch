import { resolve } from 'node:path'
import { cwd } from 'node:process'

import Legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Imagemin from 'unplugin-imagemin/vite'
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import mkcert from 'vite-plugin-mkcert'
import { viteObfuscateFile } from 'vite-plugin-obfuscator'
import vueDevTools from 'vite-plugin-vue-devtools'

import { generateEnv, generateProxy } from './vite/helper'

export default defineConfig(({ mode }) => {
  console.log(mode)
  const {
    VITE_TITLE,
    VITE_BASE,
    VITE_HTTPS,
    VITE_DROP_CONSOLE,
    VITE_SOURCEMAP,
    VITE_UGLIFY,
    VITE_LEGACY,
    VITE_IMAGEMIN,
    VITE_OPEN,
    VITE_PORT,
    VITE_PROXY,
  } = generateEnv(loadEnv(mode, cwd()))

  const config = {
    root: cwd(),
    base: VITE_BASE || '/',
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'vue-router': [
              'createRouter',
              'createWebHashHistory',
              'createMemoryHistory',
              'createWebHistory',
            ],
          },
          {
            pinia: [
              'createPinia',
              'defineStore',
            ],
          },
          {
            dayjs: [
              ['default', 'dayjs'],
            ],
          },
          {
            'vue-i18n': [
              'createI18n',
              'useI18n',
            ],
          },
        ],
        resolvers: [
          ElementPlusResolver(),
          VantResolver(),
        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        dts: false,
        resolvers: [
          ElementPlusResolver(),
          VantResolver(),
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(cwd(), 'src'),
        '~': resolve(cwd()),
      },
    },
  }

  if (mode === 'development') {
    config.plugins = config.plugins.concat(
      [
        vueDevTools(),
        createHtmlPlugin({
          inject: {
            data: {
              title: VITE_TITLE,
            },
          },
        }),
      ],
    )

    config.server = {
      host: true,
      https: VITE_HTTPS,
      open: VITE_OPEN,
      port: VITE_PORT || 5173,
      proxy: generateProxy(VITE_PROXY),
    }

    if (VITE_HTTPS)
      config.plugins = config.plugins.concat([mkcert()])
  }

  if (mode === 'production') {
    config.plugins = config.plugins.concat(
      [
        createHtmlPlugin({
          minify: true,
          inject: {
            data: {
              title: VITE_TITLE,
            },
          },
        }),
      ],
    )

    config.esbuild = {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    }

    config.build = {
      chunkSizeWarningLimit: 2000,
      sourcemap: VITE_SOURCEMAP,
    }

    if (VITE_UGLIFY) {
      config.plugins = config.plugins.concat([
        viteObfuscateFile({
          rotateUnicodeArray: true,
        }),
      ])
    }

    if (VITE_LEGACY) {
      config.plugins = config.plugins.concat([
        Legacy({
          targets: ['iOS >= 11', 'Chrome >= 64'],
          modernPolyfills: true,
        }),
      ])
    }
    else {
      config.build.target = 'es2015'
    }

    if (VITE_IMAGEMIN) {
      config.plugins = config.plugins.concat([
        Imagemin(),
      ])
    }

    // preview
    config.preview = {
      port: VITE_PORT || 5173,
      proxy: generateProxy(VITE_PROXY),
    }
  }

  return config
})
