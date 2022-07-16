/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [
        VantResolver(),
        IconsResolver(),
        (componentName) => {
          if (componentName === ('Icon'))
            return { name: componentName, from: '@iconify/vue' }
        }],
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          vant: [
            'Toast',
          ],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
        './src/api',
      ],
      vueTemplate: true,
      resolvers: [VantResolver()],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/vbenjs/vite-plugin-compression
    // gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },

  // devServer
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
    // 代理
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/5c21e309d9f9e59a2babf4c6cab345c1',
        changeOrigin: true,
        // rewrite: path => path.replace('/api/', '/'),
      },
    },
  },

  build: {
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsDir: 'static/assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
