const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // entry
  output: {
    path: path.resolve(__dirname, 'dist'),  // output folder
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,  // js and jsx files
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,  // CSS files
        use: ['style-loader', 'css-loader'],  // Loaders for CSS
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // resolve extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // HTML template
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),  // folder to serve
    port: 3001,
    hot: true,  // hot reloading on
  },
};