const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "./src/main.js"),
    //entry: path.join(__dirname, "./src/main.js"),
    // output: {
    //     filename: "bundle.js",
    //     path: path.join(__dirname, 'dist')
    // },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },
        
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test:/.css$/,//正则表达式
                loader:'css-loader'
            }
        ]
    }
}

