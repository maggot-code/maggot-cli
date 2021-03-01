/*
 * @Author: maggot-code
 * @Date: 2021-02-28 16:23:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-03-01 09:59:12
 * @Description: config options
 */
const resolves = dir => require('path').join(__dirname, dir);
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pluginList = [];

const options = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    css: {
        // 查看CSS属于哪个css文件
        sourceMap: process.env.NODE_ENV === 'development',
        extract: true
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolves('src'));
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITLE || "vue"
            return args
        });
        // 移除prefetch插件，避免加载多余的资源
        config.plugins.delete('prefetch');
        // 移除 preload 插件，避免加载多余的资源
        config.plugins.delete('preload');
    },
    configureWebpack: config => {
        // 调试JS
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map';
        } else {
            pluginList.push(new BundleAnalyzerPlugin());
        }

        //打包文件大小配置
        config.performance = {
            "maxEntrypointSize": 10240 * 100,
            "maxAssetSize": 10240 * 100
        }
        // 公共代码抽离
        config.optimization = {
            // 分割代码块
            splitChunks: {
                cacheGroups: {
                    //公用模块抽离
                    common: {
                        chunks: 'initial',
                        minSize: 10240 * 10, //大于0个字节
                        minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
                    },
                    vendor: {
                        priority: 1, //权重
                        test: /node_modules/,
                        chunks: 'initial',
                        minSize: 10240 * 10, //大于0个字节
                        minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
                    }
                },
            }
        };
        config.plugins.push(...pluginList);
        config.mode = process.env.NODE_ENV;
    }
};

module.exports = options;