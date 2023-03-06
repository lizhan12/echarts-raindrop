const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  experiments: {
    outputModule: true
  },
  output: {
    filename: 'raindrop.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  externals: {
    echarts: 'echarts'
  }

};
