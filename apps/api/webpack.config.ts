import path from "path";
import type { Configuration } from "webpack";

const config: Configuration = {
  target: "node",
  mode: "production",
  devtool: "source-map",
  entry: "./index.ts",
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
        exclude: /node_modules/,
      },
    ],
  },
};
export default config;
