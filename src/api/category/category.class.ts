import * as mongoose from "mongoose";
import { ICategory } from "./category.interface";

export const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  categoryId: { type: String, required: true },
  name: { type: String, required: true },
  description: {type: String,required: true},
  image: {type: String,required: true},
  featured: {type: Boolean,required: true},
  productCount: {type: Number,required: true},
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;