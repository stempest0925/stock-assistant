import mongoose, { Document, Schema, Model } from "mongoose";

export interface IFile extends Document {
  filename: string;
  originalName: string;
  path: string;
  ext: string;
  mime: string;
  size: number;
  createTime: Date;
  uploadTime: Date;
  metadata: Record<string, any>;
  categoryId: Schema.Types.ObjectId;
}

const fileSchema = new Schema<IFile>({
  filename: String,
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  ext: String,
  mime: String,
  size: Number,
  createTime: { type: Date, default: Date.now },
  uploadTime: { type: Date, default: Date.now },
  metadata: Object,
  categoryId: { type: Schema.Types.ObjectId, ref: "category" },
});

const FileModel: Model<IFile> = mongoose.model<IFile>("File", fileSchema);

export default FileModel;
