const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js"
  },
  resolve: {
    // 自动解析文件扩展
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devtool: process.env.NODE_ENV === "production" ? false : "inline-source-map",
  devServer: {
    contentBase: "./dist", // 基于哪个文件夹运行
    stats: "errors-only", // 只有当出现错误的时候，控制台才会打印
    compress: false, // 不启动压缩
    host: "localhost",
    port: 8089
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist'], // 在build之前，把dist文件夹清理掉
    }),
    new HtmlWebpackPlugin({
      template: "./src/template/index.html"
    }),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../src/modules/handle-title.js'),
      to: path.resolve(__dirname, '../dist')
    }])
  ]
}