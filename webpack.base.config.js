const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  // devtool: "source-map",
  // entry: './src/lib/index.js',
  entry: './src/index.js',
  // experiments: {
  //   outputModule: true
  // },
  output: {
    filename: 'main.js',
    // libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    // library: ['raindrop'],
    // library: {
    //   type:'module'
    // }
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
    'echarts': 'echarts'
  }

};
