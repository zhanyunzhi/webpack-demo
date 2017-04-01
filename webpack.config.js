var path =  require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');         //引入插件
var webpack = require('webpack');         //引入插件

module.exports = {
    entry: './src/app.js',           //入口文件1
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/[name].bundle.js',                   //name对应entry里面的属性名，chunkhash对应各自生成的hash
    },
    module: {
        rules: [
          {
              test: /\.js$/,
              use: [{
                  loader: 'babel-loader',
                  query: {
                      presets: ['latest']
                  }
              }],
              exclude: [
                  path.resolve(__dirname,'node_modules'),          //排除不使用当前loader的文件
              ],
              include: [
                  path.resolve(__dirname,'src'),          //指定要使用loader打包的文件
              ]
          },
          {                     //处理css文件
              test: /\.css$/,
              use: [
                  { loader: 'style-loader'},
                  { loader: 'css-loader?importLoaders=1'},
                  { loader: 'postcss-loader'}
              ]
          },
          {                 //处理less文件
              test: /\.less$/,
              use: [
                  { loader: 'style-loader'},
                  { loader: 'css-loader'},
                  { loader: 'postcss-loader'},
                  { loader: 'less-loader'}
              ]
          },
          {                 //处理sass文件
              test: /\.scss$/,
              use: [
                  { loader: 'style-loader'},
                  { loader: 'css-loader'},
                  { loader: 'postcss-loader'},
                  { loader: 'sass-loader'}
              ]
          },
          {                 //处理html文件，将html转成字符串
              test: /\.html$/,
              use: [
                  { loader: 'html-loader'}
              ]
          },
          {                 //处理图片文件
            test: /\.(png|jpg|gif|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    query: {
                        name: 'assets/[name].[ext]',       //改变打包存储的路径
                        limit: 900                //小于20000B的图片打包成base64，超过的用file-loader打包
                    }
                },
                {
                    loader: 'img-loader'
                }
            ]
          }
      ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){            //postcss的配置
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN','last 5 versions']           //浏览器版本
                        })
                    ]
                }
            }
        })
    ]
}