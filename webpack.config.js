const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    manipulateDom: './src/manipulateDom.js',
    getData: './src/getData.js',
},
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Weather App',
      template: './src/index.html',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: "/weather-app/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
   test: /\.(woff|woff2|eot|ttf|otf)$/i,
   type: 'asset/resource',
      }
    ],  
  },
};