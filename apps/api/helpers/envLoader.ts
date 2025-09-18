import dotenv from "dotenv";
import path from "path";

const mode = process.env.NODE_ENV ?? "development";

const ENV_PATH_MAPPING: Record<string, string> = {
  development: path.join(__dirname, "../.env.development"),
  production: path.join(__dirname, "../.env.production"),
};

const envPath = ENV_PATH_MAPPING[mode] ?? ENV_PATH_MAPPING.development;

dotenv.config({ path: envPath });

export const ENV = process.env;
