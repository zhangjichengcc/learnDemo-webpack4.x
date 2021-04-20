/*
 * @Author: zhangjicheng
 * @Date: 2021-04-08 14:21:04
 * @LastEditTime: 2021-04-20 15:59:06
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\webpack.prod.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// @ts-nocheck

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.ts');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = merge(common, {
  mode: 'production', // 指定构建模式 development 为未压缩版

  devtool: 'none',

  module: {
    rules: [
      {
        test: /\.css$/i,
        sideEffects: true,
      }
    ]
  },

  plugins: [],

  resolve: {},

  optimization: {
    usedExports: true, // 模块内未使用的部分不进行导出
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i, // 只处理 .js 文件
      cache: true, // 启用缓存，可以加速压缩处理
    })], // 配置代码压缩工具
  },
})
