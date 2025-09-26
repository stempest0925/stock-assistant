import fs from "fs";
import path from "path";
import multer from "multer";
import { format } from "date-fns";

interface FileUploaderOptions {
  destDir: string;
  limitSize: number;
  allowedTypes: string[];
}

export default class FileUploader {
  upload: multer.Multer;

  uploadDir: string;
  limitSize: number;
  allowedTypes: string[] | null;

  constructor(options: Partial<FileUploaderOptions> = {}) {
    this.uploadDir = options.destDir ?? path.join(__dirname, "../static/uploads");
    this.limitSize = options.limitSize ?? 100 * 1024 * 1024;
    this.allowedTypes = options.allowedTypes ?? null;

    this._existDir(this.uploadDir);
    this.upload = this._setup();
  }

  // 检查存在目录
  _existDir(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // 设置
  _setup(): multer.Multer {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const datetime: number = Number(req.body.datetime) || Date.now();
        const dateformat = format(new Date(datetime), "yyyyMMdd");
        const destDir = path.join(this.uploadDir, dateformat);

        this._existDir(destDir);

        cb(null, destDir);
      },
      filename: (req, file, cb) => {
        let filename: string;

        if (req.body.filename) {
          filename = req.body.filename + path.extname(file.originalname);
        } else {
          filename = Buffer.from(file.originalname, "latin1").toString("utf-8"); // 解决中文命名乱码
        }

        cb(null, filename);
      },
    });

    return multer({
      storage,
      limits: { fileSize: this.limitSize },
      fileFilter: (req, file, cb) => {
        this._typeFilter(file) ? cb(null, true) : cb(new Error("不受支持的文件格式。"));
      },
    });
  }

  // 类型过滤
  _typeFilter(file: Express.Multer.File): boolean {
    // const fileExt = path.extname(file.originalname).toLowerCase();
    // const isAllowExt = [".json", ".csv"].includes(fileExt);
    if (this.allowedTypes === null) return true; // allowedTypes为null时代表不过滤类型

    const isAllowMime = this.allowedTypes.includes(file.mimetype);
    // return isAllowExt && isAllowMime;
    return isAllowMime;
  }

  // 获取上传对象
  get() {
    return this.upload;
  }
}
