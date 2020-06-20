import * as mongoose from 'mongoose';
import { IProduct } from './product.interface';

export const ProductSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  stocks: { type: Number, required: true },
  price: { type: Number, required: true },
  imageGallery: { type: String, required: true },
  discount: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
