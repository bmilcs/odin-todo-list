const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "img/[name].[ext]",
    clean: true,
  },

  mode: "development",

  devtool: "inline-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo List: Odin Project #11",
      template: "./src/template.html",
      filename: "index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },

      {
        test: /\.svg$/i,
        use: "raw-loader",
      },
    ],
  },

  devServer: {
    static: "./dist",
  },

  optimization: {
    runtimeChunk: "single",
  },
};

