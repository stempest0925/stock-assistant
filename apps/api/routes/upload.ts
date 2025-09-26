import fs from "fs";
import path from "path";
import { Router } from "express";
import { format } from "date-fns";

import FileUploader from "../helpers/upload";
import FileModel, { IFile } from "../models/file";
import CategoryModel, { ICategory } from "../models/category";
import { ENV } from "../helpers/envLoader";

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

/**
 * multipart/form-data 格式数据由 multer 中间件解析后，将请求体数据解析到 req.body / req.files。
 * 因此在 upload.signal、array、fields 回调函数前，无法访问到 req.body 数据。
 */
const allowedTypes = ["application/json", "text/csv", "application/vnd.ms-excel"];
const upload = new FileUploader({ destDir: ENV.UPLOAD_DIR, allowedTypes }).get();

uploadRoute.post("/upload", upload.array("files", 12), async (req, res) => {
  try {
    // 对象类型的files在upload.fields方法下会出现，upload.array则为数组
    const multerFiles: Express.Multer.File[] | undefined =
      typeof req.files === "object" ? Object.values(req.files).flat() : req.files;
    // const formData = req.body; 暂时不使用，后续根据文件匹配数据

    if (!multerFiles || multerFiles.length === 0) {
      return res.status(400).send("没有文件上传。");
    }

    const categories: string[] = [];
    const insertData: IFile[] = multerFiles.map((item) => {
      const originalName = Buffer.from(item.originalname, "latin1").toString("utf-8");

      const category = path.basename(originalName);
      categories.push(category);

      return new FileModel({
        filename: item.filename,
        originalName,
        path: item.path,
        ext: path.extname(item.originalname),
        mime: item.mimetype,
        size: item.size,
        metadata: req.body,
      });
    });
    await FileModel.insertMany(insertData);

    // 类型
    const existingCategories = await CategoryModel.find();
    const existingCategoriesName = new Set(existingCategories.map((item) => item.name));
    const noExistingCategories = categories.filter((item) => !existingCategoriesName.has(item));

    if (noExistingCategories.length > 0) {
      const categoryData = noExistingCategories.map((item) => new CategoryModel({ name: item }));
      CategoryModel.insertMany(categoryData);
    }

    res.status(200).send("文件传输成功。");
  } catch (error) {
    res.status(500).send("文件上传发生错误。");
  }
});

export default uploadRoute;
