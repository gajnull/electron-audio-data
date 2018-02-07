const webpack = require('webpack')
const path = require('path')

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js'
})

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }]
          ]
        }
      }]
    },{
      test: /\.scss$/,
      use: [
       'style-loader',
       'css-loader',
       'sass-loader'
      ]
    },{
  	  test: /\.(png|jpg)$/,
  	  use: [{
  	    loader: 'url-loader',
  	    options: { limit: 70000 } // Convert images < 10k to base64 strings
  	  }]
	  }]
  }
}

module.exports = config
