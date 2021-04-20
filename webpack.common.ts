/* tslint:disable */
/*
 * @Author: zhangjicheng
 * @Date: 2021-04-08 14:21:04
 * @LastEditTime: 2021-04-20 15:45:55
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\webpack.common.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

// @ts-nocheck comentjs 默认将引入模块添加到全局，path 等引用会报重复引入的错误
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackBar = require('webpackbar');


module.exports = {
  entry: './src/App.tsx', // 指定构建入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 指定构建生成文件所在路径
    filename: '[name].[hash].js',// 入口文件出口
    chunkFilename: '[name].[hash].js',// 非入口文件出口
    sourceMapFilename: "sourcemaps/[file].map", // 「source map 位置」的文件名模板
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
        test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
                OptimizationLevel: 2,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
            }
          },
        ]
      },
      // url-loader 和 file-loader 二选一
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      // },
      // the 'transform-runtime' plugin tells Babel to
      // require the runtime instead of inlining it.
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import'],
          }
        }
      },
      { // 处理 TypeScript文件
        test:/\.tsx?$/i,
        use:{
          loader:'ts-loader'
        },
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new WebpackBar(),
    // new HtmlWebpackPlugin(), // 默认在dist 创建.html并引入 js
    new HtmlWebpackPlugin({
      template: 'src/document.ejs', // 配置文件模板
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        collapseInlineTagWhitespace: true, 
        collapseWhitespace: true, // 和上一个配置配合，移除无用的空格和换行
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin(['dist'], {
      root:__dirname,
      verbose: true,
      dry: false,
      exclude: ['jslibs']
    }),
    new BundleAnalyzerPlugin({  // 查看 build 包分布及大小
      // server模式会开启一个服务器展示打包结果；
      // static模式会生成一个 HTML 页面；
      // json模式会生成一个 JSON 文件；
      // disabled模式需要同时设置generateStatsFile:true，只会生成一个 JSON 文件
      analyzerMode: 'disabled',
      generateStatsFile: true,  // 是否生成stats.json文件
      openAnalyzer: false,
      statsOptions: { source: false }
    })
  ],

  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      'assets': path.resolve(__dirname, 'src/assets/'),
      'components': path.resolve(__dirname, 'src/components'),
    },
    // 自动补全后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.ejs', '.mjs', '.wasm', '.yml']
  },

  optimization: {
    splitChunks: {
      chunks: 'initial', // 只对入口文件处理
      // minChinks: 2, // 模块最小使用次数
      cacheGroups:{
        vendors: { 
          test: /node_modules\//,
          name: 'vendor',
          priority: 10,
          enforce: true,
          chunks: 'all'
        },
        commons: {
          name: "commons",   
          chunks: "all",  // async异步代码分割 initial同步代码分割 all同步异步分割都开启
          minSize: 10000,         // 字节 引入的文件大于30kb才进行分割    
          priority: 0,   // 优先级，先打包到哪个组里面，值越大，优先级越高
        }    
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 开发服务器启动路径
    open: true,
  }
}