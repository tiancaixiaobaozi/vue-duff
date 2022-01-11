const CompressionPlugin = require('compression-webpack-plugin')
const externals = {
  'vue': 'Vue',
  'axios': 'axios',
  'element-ui': 'ELEMENT',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex'
}
const cdn = {
  css: [
    // element-ui css
    '//unpkg.com/element-ui/lib/theme-chalk/index.css'
  ],
  js: [
    // vue
    '//cdn.staticfile.org/vue/2.5.22/vue.min.js',
    // vue-router
    '//cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js',
    // vuex
    '//cdn.staticfile.org/vuex/3.1.0/vuex.min.js',
    // axios
    '//cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
    // element-ui js
    '//unpkg.com/element-ui/lib/index.js'
  ]
}

module.exports = {
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    port: '4399',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8008', // API服务器的地址
        ws: false, // 代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: { // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: config => {
    // 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin('define').tap(args => {
      args[0]['process.env'].BASE_URL = JSON.stringify(process.env.BASE_URL)
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      // # 启用GZip压缩
      config
        .plugin('compression')
        .use(CompressionPlugin, {
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => { })
      // # end
      // # 忽略生产环境打包的文件
      config.externals(externals)
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
      // # end
    }
  }
}
