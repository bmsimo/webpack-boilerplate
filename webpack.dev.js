const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", // Sourcemaps
  devServer: {
    contentBase: "./dist",
    // contentBase: path.join(__dirname, "dist"),
  },
  optimization: {
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
        // include: path.resolve(__dirname, "src"), // Applies Babel-loader, only to the files in this folder
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //   {
      //     //   CSS
      //     test: /\.css$/,
      //     use: [
      //       {
      //         loader: "style-loader",
      //         loader: "css-loader",
      //       },
      //     ],
      //   },
      //   {
      //     //Images Loading
      //     test: /\.(png|svg|jpg|gif)$/,
      //     use: ["file-loader"],
      //   },
      //   {
      //     //Fonts Loading
      //     test: /\.(woff|woff2|eot|ttf|otf)$/,
      //     use: ["file-loader"],
      //   },
    ],
  },
});
