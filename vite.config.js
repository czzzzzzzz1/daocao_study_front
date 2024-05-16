import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// import path from "path"

// 导入element Plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
   
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      resolvers: [
        // 自动导入element-plus
        ElementPlusResolver(),
      ],
    }),
    Components({
      resolvers: [
        // 自动注册element-plus
        ElementPlusResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
      // "@":path.resolve(__dirname,"./src")
    }
  }
})
