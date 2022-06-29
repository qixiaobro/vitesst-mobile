/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import viteCompression from 'vite-plugin-compression'
import Unocss from 'unocss/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
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

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [VantResolver()],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md
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

  // 本地服务
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
    // 代理
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:4523/mock/1145221',
        target: 'https://api.apiopen.top/',
        changeOrigin: true,
        // rewrite: path => path.replace('/api/', '/'),
      },
    },
  },

  // 构建
  build: {
    brotliSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    // 在生产环境移除console.log
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    assetsDir: 'static/assets',
    // 静态资源打包到dist下的不同目录
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
