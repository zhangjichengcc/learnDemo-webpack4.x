/*
 * @Author: zhangjicheng
 * @Date: 2021-04-08 14:21:04
 * @LastEditTime: 2021-04-09 18:58:53
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\webpack.config.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 

module.exports = {
  mode: 'development', // 指定构建模式 development 为未压缩版

  entry: './src/index.js', // 指定构建入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle[hash].js', // 指定构建生成的文件名
  },

  plugins: [
    // new HtmlWebpackPlugin(), // 默认在dist 创建.html并引入 js
    new HtmlWebpackPlugin({
      template: 'src/index.html', // 配置文件模板
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  }
}