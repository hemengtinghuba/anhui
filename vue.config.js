module.exports = {
    //css相关配置
    css: {
        loaderOptions: {
            css: {// 这里的选项会传递给 css-loader
                
            },
            sass: {
                data: `@import "@/scss/index.scss";`
            }
        },
        sourceMap: false,
        extract: true
    },
    //第三方依赖剥离
    configureWebpack: {
        externals: {
            vue: "Vue",
            "element-ui": "ELEMENT",
        }
    },
    //代理服务器配置
    devServer: {
        proxy: {
            "/": {
                target: "http://http://39.107.233.12",
                ws: false,
                changeOrigin: true
            },
        }
    },
    publicPath: "/admin_template",
    productionSourceMap: false,//打包时候js是否添加sourceMap
};
