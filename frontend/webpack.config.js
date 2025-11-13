// Webpack configuration for the frontend
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  // Load environment variables based on mode
  const envFile = isProduction ? ".env.production" : ".env";
  const envConfig = dotenv.config({ path: path.resolve(__dirname, envFile) }).parsed || {};

  return {
    mode: argv.mode || "development",
    entry: "./src/main.jsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/",
      clean: true,
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: true,
      publicPath: "/",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        ...process.env,
        ...envConfig,
        NODE_ENV: argv.mode || "development",
      }),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3003,
    historyApiFallback: {
      disableDotRule: true,
      index: "/",
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
};
}

