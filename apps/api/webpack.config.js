const path = require("path");

module.exports = {
  target: "node",
  mode: "production",
  devtool: "source-map",
  entry: path.resolve(__dirname, "index.ts"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "api.bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
        // exclude: /node_modules/,
      },
    ],
  },
};
