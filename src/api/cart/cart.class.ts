import * as mongoose from 'mongoose';
import { ICart } from './cart.interface';

export const CartSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.String, ref: 'Client' },
  items: [
    {
      productId: { type: String, required: true },
      productPrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model<ICart>('Cart', CartSchema);
export default Cart;
