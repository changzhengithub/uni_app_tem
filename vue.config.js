const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages()  
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
      new tfPages.webpack.DefinePlugin({  
        ROUTES: JSON.stringify(tfPages.routes)  
      })
    ]
  }
}
