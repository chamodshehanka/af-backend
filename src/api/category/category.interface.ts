import * as mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  productCount: number;
}
