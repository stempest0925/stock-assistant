import multer from "multer";
import path from "path";
import fs from "fs";

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
        cb(null, this.uploadDir);
      },
      filename: (req, file, cb) => {
        const fileName = Buffer.from(file.originalname, "latin1").toString("utf-8"); // 解决中文命名乱码
        cb(null, fileName);
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
