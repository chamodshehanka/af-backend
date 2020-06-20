import * as mongoose from 'mongoose';
import { IOrder } from './order.interface';

export const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.String, ref: 'Client' },
  orderDetails: [
    {
      productId: { type: String, required: true },
      productPrice: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  date: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  deliveryDetails: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: false },
    address: { type: String, required: true },
    apartment: { type: String, required: false },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
