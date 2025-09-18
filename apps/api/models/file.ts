import mongoose, { Document, Schema, Model } from "mongoose";

export interface IFile extends Document {
  filename: string;
  originalName: string;
  folder: string;
  path: string;
  ext: string;
  mime: string;
  size: number;
  createTime: Date;
  uploadTime: Date;
  meta: Record<string, any>;
}

const fileSchema = new Schema<IFile>({
  filename: String,
  originalName: { type: String, required: true },
  folder: String,
  path: { type: String, required: true },
  ext: String,
  mime: String,
  size: Number,
  createTime: { type: Date, default: Date.now },
  uploadTime: { type: Date, default: Date.now },
  meta: Object,
});

const FileModel: Model<IFile> = mongoose.model<IFile>("File", fileSchema);

export default FileModel;
