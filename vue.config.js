const VueSSRServerPlugin = require("vue-server-renderer/server-plugin")
const VueSSRClientPlugin=require("vue-server-renderer/client-plugin")
const nodeExternals=require("webpack-node-externals")
const merge=require("lodash.merge")
const TARGET_NODE=process.env.WEBPACK_TARGET === "node";
const target=TARGET_NODE ? "server":"client";
module.exports= {
    css: {
        extract: false
    },
    configureWebpack: () => ({
        entry:TARGET_NODE ? `./src/entry-${target}.js`:'./src/main.js',
        devtool:'source-map',
        target:TARGET_NODE ? "node" : "web",
        node: TARGET_NODE ? undefined : false,
        output:{
            libraryTarget:TARGET_NODE ? "commonjs2" : undefined
        },
        externals:TARGET_NODE ? nodeExternals({whitelist:[/\.css$/]}) : undefined,
        optimization:{splitChunks:undefined},
        plugins:[TARGET_NODE ? new VueSSRServerPlugin(): new VueSSRClientPlugin()],
    }),
    chainWebpack: config=>{
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options=>{
                merge(options,{
                    optimizeSSR:false
                });
            });
    },
    devServer: {
        proxy: {
            "test": {
                target: 'http://localhost:3000', //这里写的是访问接口的域名和端口号118.25.71.140
                changeOrigin: true, //跨域请求,
                pathRewrite: { // 重命名
                    '^/test': ''
                }
            }
        }
    }
}