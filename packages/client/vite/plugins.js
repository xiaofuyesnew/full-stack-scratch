import Legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Imagemin from 'unplugin-imagemin/vite'
import {
  ElementPlusResolver,
  // VantResolver
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import mkcert from 'vite-plugin-mkcert'
import { viteObfuscateFile } from 'vite-plugin-obfuscator'
import vueDevTools from 'vite-plugin-vue-devtools'

export function generatePlugins({ mode, env }) {
  const {
    VITE_TITLE,
    VITE_HTTPS,
    VITE_UGLIFY,
    VITE_LEGACY,
    VITE_IMAGEMIN,
  } = env

  return [
    mode === 'development' && vueDevTools(),
    vue(),
    UnoCSS(),
    VITE_HTTPS && mkcert(),
    createHtmlPlugin({
      minify: mode === 'production',
      inject: {
        data: {
          title: VITE_TITLE,
        },
      },
    }),
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
          axios: [
            ['default', 'axios'],
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
        // VantResolver(),
      ],
      eslintrc: {
        enabled: true,
        filepath: '.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      dts: false,
      globs: [
        './src/components/global/*.vue',
        './src/components/global/**/index.vue',
        './src/layout/index.vue',
      ],
      resolvers: [
        ElementPlusResolver(),
        // VantResolver(),
      ],
    }),
    VITE_UGLIFY && viteObfuscateFile({
      rotateUnicodeArray: true,
    }),
    VITE_LEGACY && Legacy({
      targets: ['iOS >= 11', 'Chrome >= 64'],
      modernPolyfills: true,
    }),
    VITE_IMAGEMIN && Imagemin(),
  ].filter(Boolean)
}
