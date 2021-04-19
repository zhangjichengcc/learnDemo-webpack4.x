/*
 * @Author: zhangjicheng
 * @Date: 2021-04-08 14:21:04
 * @LastEditTime: 2021-04-19 15:31:00
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\webpack.dev.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// @ts-nocheck
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.ts');


module.exports = merge(common, {
  mode: 'production', // 指定构建模式 development 为未压缩版
  devtool: 'source-map',

  module: {
    rules: []
  },

  plugins: [],

  resolve: {},

  optimization: {
    minimize: false,
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  }
})
