import express from "express";

import uploadRoute from "./routes/upload";

const app = express();
const PROT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).end("Hello World!!!");
});

app.use(uploadRoute);

app.listen(PROT, () => {
  console.log("服务启动成功!");
});
