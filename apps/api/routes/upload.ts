import { Router } from "express";
import fs from "fs";
import path from "path";

import FileUploader from "../helpers/upload";
import FileModel, { IFile } from "../models/file";

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

const upload = new FileUploader({
  allowedTypes: ["application/json", "text/csv", "application/vnd.ms-excel"],
}).get();
/**
 * multipart/form-data 格式数据由 multer 中间件解析后，将请求体数据解析到 req.body / req.files。
 * 因此在 upload.signal、array、fields 回调函数前，无法访问到 req.body 数据。
 */
uploadRoute.post("/upload", upload.array("files", 12), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("没有文件上传。");
    }

    if (Array.isArray(req.files)) {
      const insertData: IFile[] = req.files.map(
        (item) =>
          new FileModel({
            filename: item.filename,
            originalName: item.originalname,
            folder: "",
            path: item.path,
            ext: path.extname(item.originalname),
            mime: item.mimetype,
            size: item.size,
            // uploadTime: { type: Date, default: Date.now },
            meta: req.body,
          }),
      );
      FileModel.insertMany(insertData);
    }

    res.status(200).send("文件传输成功 " + req.files.length + " 个。");
  } catch (error) {
    res.status(500).send("文件上传发生错误。");
  }
});

export default uploadRoute;
