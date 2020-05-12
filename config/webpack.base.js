/*
 * @Author: your name
 * @Date: 2019-10-25 10:10:05
 * @LastEditTime: 2020-05-12 15:20:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webpack_study/myproject/config/webpack.base.js
 */
const webpack = require('webpack'); //to access webpack runtime
const HtmlWebpackPlugin = require('html-webpack-plugin');
// util
const { current_resolve, log } = require('./conf_util');


const actionDir = current_resolve('../src/redux/action/');
const srcDir = current_resolve('../src/');

const _alias = {
  action$: actionDir,
  src$: srcDir,
}

// console.log(actionDir, srcDir, 'srcDir')

/** document @see https://webpack.js.org/configuration/ */
const base_conf = {
  /**
   * production | development | none
   */
  mode: 'none',
  // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  context: current_resolve('../src'),
  entry: {
    index: './index.tsx',
    // main: current_resolve('../src/main.ts'),
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    // 引入文件可以省略 后缀名
    extensions: [".ts", ".tsx", ".js", ".scss", '.json'],
    modules: ['node_modules'],
    alias: {
      '@action': actionDir,
      '@': srcDir,
    }
  },
  output: {
    path: current_resolve('../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      // { test: /\.(js|mjs|jsx|ts|tsx)?$/, loader: "ts-loader" },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        // exclude: /@babel(?:\/|\\{1,2})runtime/,
        use: [
          'babel-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 必须使用 绝对路径
      // template: current_resolve('../src/pages/document.html'),
      template: './pages/document.html',
      filename: 'index.html'
    })
  ]
};

module.exports = base_conf;
