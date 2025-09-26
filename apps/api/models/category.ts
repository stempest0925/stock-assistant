import mongoose, { Document, Schema, Model } from "mongoose";

interface ICategory extends Document {
  name: string;
  createTime: Date;
}

const categorySchema = new Schema<ICategory>({
  name: String,
  createTime: { type: Date, default: Date.now },
});

const CategoryModel: Model<ICategory> = mongoose.model("category", categorySchema);

export default CategoryModel;
