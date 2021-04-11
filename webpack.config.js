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
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // 指定构建模式 development 为未压缩版

  entry: './src/index.js', // 指定构建入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: 'bundle[hash].js', // 指定构建生成的文件名
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'style-loader', // 当使用 miniCssExtractPlugin 则无需使用style-loader
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          }
        ]
      },
      // the 'transform-runtime' plugin tells Babel to
      // require the runtime instead of inlining it.
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.jsx?$/,
        // use: ["source-map-loader"],
        enforce: "pre",
        use: [
          {
            loader: "source-map-loader",
            options: {
              filterSourceMappingUrl: (url, resourcePath) => {
                if (/broker-source-map-url\.js$/i.test(url)) {
                  return false;
                }

                if (/keep-source-mapping-url\.js$/i.test(resourcePath)) {
                  return "skip";
                }

                return true;
              },
            },
          },
        ],
      }
    ]
  },

  plugins: [
    // new HtmlWebpackPlugin(), // 默认在dist 创建.html并引入 js
    new HtmlWebpackPlugin({
      template: 'src/index.html', // 配置文件模板
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    })
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist') // 开发服务器启动路径
  }
}