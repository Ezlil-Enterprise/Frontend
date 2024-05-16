const path=require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
    entry: "./src/index.js",
    output:{
        filename:"index.bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
    },
    devServer:{
        port:3015,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'), 
          },
        
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
            publicPath: '/',
          }),
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", 
                    "css-loader", 
                    "less-loader"
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
              },
        ]
    }
}