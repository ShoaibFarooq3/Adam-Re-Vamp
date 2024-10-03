const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader", // Added postcss-loader
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      },
      // {
      //   test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
      //   loader: 'url-loader?limit=100000', // Uncomment this line if needed
      // },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          toType: "dir",
        },
        {
          from: path.resolve(__dirname, "src/assets/fonts"),
          to: path.resolve(__dirname, "dist/fonts"),
          toType: "dir",
        },
        {
          from: path.resolve(__dirname, "src/wasm/openscad.js"),
          from: path.resolve(__dirname, "src/wasm/openscad.wasm"),
        },
      ],
    }),
    new Dotenv(),
  ],
};
