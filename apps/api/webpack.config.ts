import path from "path";
import type { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const config: Configuration = {
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
  // optimization: {
  //   minimize: true,
  //   usedExports: true,
  // },
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
  // plugins: [new BundleAnalyzerPlugin()],
};
export default config;

// Webpack 读取 TS 配置文件，参考官方文档：https://www.webpackjs.com/configuration/configuration-languages/
