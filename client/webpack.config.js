const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest, GenerateSW } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      hot: "only",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "service-worker.js",
      }),
      new WebpackPwaManifest({
        filename: "manifest.json",
        publicPath: "/",
        name: "Just Another Text Editor",
        short_name: "Jate",
        description: "Create and edit code snipits",
        background_color: "#272822",
        theme_color: "#31a9e1",
        start_url: "/",
        icons: [
          {
            src: path.resolve("./favicon.ico"),
            sizes: [96],
            destination: "assets/icons",
            name: "icon_[size].png",
            filename: "icon_[size].png",
          },
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: "assets/icons",
            name: "icon_[size].png",
            filename: "icon_[size].png",
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
