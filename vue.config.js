const TransformPages = require('uni-read-pages') // 获取page.json路由表进行自定义路由
const { webpack } = new TransformPages()
module.exports = {
  // 代理
  devServer: {
    // port: '8080', // 端口
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://192.168.100.14:3355',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ['path', 'name', 'aliasPath']
          })
          return JSON.stringify(tfPages.routes)
        }, true)
      })
    ]
  }
}
