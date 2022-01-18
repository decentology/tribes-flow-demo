const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');
const configuration = {
  entry: [
    './source/client/main.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'assets', 'bundle'),
    filename: 'client.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        resolve: {
          fullySpecified: false
        },
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  // devServer: {
  //   static: {
  //     directory: path.join(__dirname, 'client'),
  //   },
  //   compress: true,
  //   port: 9000,
  //   historyApiFallback: true,
  //   hot: true,
  //   open: true,
  // },
  resolve: {
    fallback: {
      'http': require.resolve('stream-http'),
      'https': require.resolve('https-browserify'),
      'url': require.resolve('url/'),
      'buffer': require.resolve('buffer/'),
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify')
    }
  },
};

module.exports = configuration;