import express from "express";
import mongoose from "mongoose";

console.log(process.env.DB_USER);

import uploadRoute from "./routes/upload";
import { ENV } from "./helpers/envLoader";

const app = express();

app.use(express.json()); // 处理 application/json 数据
app.use(express.urlencoded({ extended: true })); // 处理 application/x-www-form-urlencoded 数据

app.get("/", (req, res) => {
  res.status(200).end("Hello World!!!");
});

app.use(uploadRoute);

app.listen(ENV.PORT, () => {
  console.log("服务启动成功!");
  mongoose
    .connect(
      `mongodb://${ENV.DB_USER}:${ENV.DB_PASSWORD}@127.0.0.1:27017/stock_assistant?authSource=admin`,
    )
    .then(() => {
      console.log("数据库连接成功!");
    });
});
