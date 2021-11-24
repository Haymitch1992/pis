import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/v1/device/platform_ats/': {//代理api
        //target: "http://192.168.62.228:9092",//测试api地址
        target:'http://172.51.215.158:8081',
        //target: "http://101.200.86.95:9092",//开发api地址http://192.168.62.228:9092/
        changeOrigin: true,//是否跨域
        ws: true, // proxy websockets
      },
    }
  }
})
