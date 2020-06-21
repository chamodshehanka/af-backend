import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  productId: string;
  name: string;
  category: string;
  description: string;
  stocks: number;
  price: number;
  imageGallery: string;
  discount:number;
}
