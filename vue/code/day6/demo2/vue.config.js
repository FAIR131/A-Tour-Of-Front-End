const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //publicPath:'./'// 解决打包后文件引入路径问题
  transpileDependencies: true
})
