const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development", // When in Dev Mode
  entry: "./src/index.js", // When Working with one page
  //   entry: {
  //     // Multiple Pages
  //     about: "./src/about.js",
  //     contact: "./src/contact.js",
  //   },
  output: {
    filename: "main.js", // When Working with one page
    // filename: "[name].bundle.js", // Multiple Pages
    // filename: '[name].[contenthash].js', // Used when we want to add caching
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map", // Sourcemaps
  plugins: [
    new CleanWebpackPlugin(), // Clean Unused Assets
    new HtmlWebpackPlugin(), // Generate an html file
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  optimization: {
    //Split Chunks, Looking for repeated Code, Creating a Vendor JS for all Pages
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, "src"), // Applies Babel-loader, only to the files in this folder
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        //   CSS
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            loader: "css-loader",
          },
        ],
      },
      {
        //Images Loading
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        //Fonts Loading
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
};
