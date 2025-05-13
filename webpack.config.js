const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/scripts/index.js",
  output: {
    filename: "assets/js/[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    clean: true,
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
      serveIndex: true,
      watch: true,
    },
    port: 3001,
    open: true,
    hot: true,
    historyApiFallback: true,
    watchFiles: ["src/**/*", "public/**/*"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].svg",
        },
      },
      {
        test: /\.(mp4|webm|mov)$/i,
        type: "asset/resource",
        generator: {
          filename: "videos/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public/images",
          to: "images",
          noErrorOnMissing: true,
          
        },
        {
          from: "public/favicons",
          to: "favicons",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@images": path.resolve(__dirname, "src/images"),
      "@videos": path.resolve(__dirname, "src/videos"),
    },
    extensions: [".js", ".json"],
  },
};
