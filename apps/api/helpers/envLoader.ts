import dotenv from "dotenv";
import path from "path";

const mode = process.env.NODE_ENV ?? "development";

const ENV_PATH_MAPPING: Record<string, string> = {
  development: path.join(__dirname, "../.env.development"),
  production: path.join(__dirname, "../.env.production"),
};

const envPath = ENV_PATH_MAPPING[mode] ?? ENV_PATH_MAPPING.development;

dotenv.config({ path: envPath });

// 开发环境下统一上传目录，避免不同层级表现不一致
if (mode === "development") {
  process.env.UPLOAD_DIR = path.resolve(__dirname, "../static/uploads");
}

export const ENV = process.env;
