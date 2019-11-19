const webpack = require('webpack')
const baseUrl = "http://192.168.4.40:9999"
// const baseUrl = ""
module.exports = {
    outputDir: 'kits',
    publicPath: './',
    assetsDir: './static',
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'windows.jQuery': 'jquery'
            })
        ],
        performance: {
            hints: false // 关闭打包文件过大提示
        }
    },
    devServer: {
        open: true,
        proxy: {
            '/oauth': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/oauth': '/oauth'
                }
            },
            '/ptyt': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/ptyt': '/ptyt'
                }
            },
            '/kits': {
                target: baseUrl,
                changeOrigin: true,
                pathRewrite: {
                    '^/kits': '/kits'
                }
            }
        }
    }
}
