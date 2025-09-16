import { Router } from "express";
import fs from "fs";
import path from "path";

import FileUploader from "../helpers/upload";

const uploadRoute = Router();

uploadRoute.get("/stock_detail", (req, res) => {
  const startTime = performance.now();
  const readPath = path.resolve(__dirname, "../uploads/test.json");
  try {
    const fileData = fs.readFileSync(readPath, "utf-8");
    const formatData = JSON.parse(fileData);
    const time = performance.now() - startTime;

    res.status(200).json({ data: formatData, time });
  } catch (error) {
    const errSuffix = error instanceof Error ? `，错误信息：${error.message}` : "";
    res.status(500).json({ message: `获取股票数据失败${errSuffix}。` });
  }
});

// uploadRoute.get("/stock_auc", () => {});

uploadRoute.post("/upload", upload.array("files", 12), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("没有文件上传。");
    }

    const datetime = req.body.datetime || Date.now();
    const date = new Date(datetime);
    const dateDir = `${date.getFullYear()}${date.getMonth() + 1}${date.getDay()}`;
    const destDir = path.join(__dirname, `../static/uploads/${dateDir}`);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const upload = new FileUploader({
      destDir,
      allowedTypes: ["application/json", "text/csv", "application/vnd.ms-excel"],
    }).get();

    res.status(200).send("文件传输成功 " + req.files.length + " 个。");
  } catch (error) {
    res.status(500).send("文件上传发生错误。");
  }
});

export default uploadRoute;
