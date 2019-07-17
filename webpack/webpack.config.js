const merge = require('webpack-merge');
const base = require("./webpack.base.config");

const config = {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/rest': {
        target: 'http://localhost:3002',
        pathRewrite: {'^/rest' : ''}
      },
      '/mail': {
        target: 'http://35.239.209.158:3000',
        pathRewrite: {'^/mail' : ''}
      }
    }
  }
};

module.exports = merge(base, config);
