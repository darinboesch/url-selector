var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./app/app.js",

  output: {
    filename: "bundle.js",
    path: path.resolve('./public'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: /app/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },

  postcss: [
    require('autoprefixer-core')
  ],

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ],

  devtool: "eval-source-map"
};
