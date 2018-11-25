const webpack = require('webpack');
module.exports = {
  //where the main file will be liocated
  entry: './src/index.js',
  module: {
    rules: [
    //what type of file and compiler will be used
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
    //what file and module will be used for stykes
        test: /\.css$/,
        use: [
          { 
            loader: "style-loader" 
          },
          { 
            loader: "css-loader" 
          }
        ]},
      {
    //same thing for style but now in images
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader'
          }]}]},
  
  resolve: {
    extensions: ['*', '.js', '.jsx', '.css']
  },

  //where the output will be compiled and rendered
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'index.js'
  },

  //to enable hot reloading, very very useful
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }};
