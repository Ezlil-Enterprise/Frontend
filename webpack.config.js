const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: '/',
  },
  devServer: {
    port: 3015,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      publicPath: '/',
    }),
  ],
  module: {
    rules: [
      // JavaScript/JSX rule (unchanged)
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // LESS rule (unchanged)
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ],
      },
      // CSS rule (unchanged)
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Image rule using Asset Modules (recommended for webpack 5+)
      {
        test: /\.(png|jpe?g|gif|svg|ico|webp)$/,
        type: 'asset/resource', // Handles copying and emits a separate file with URL
        generator: {
          filename: 'images/[name].[ext]', // Output path and filename pattern
        },
      },
    ]
  }
};
