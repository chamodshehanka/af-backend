import * as mongoose from 'mongoose';

export interface IOrder extends mongoose.Document {
  orderId: string;
  cliendId: mongoose.Schema.Types.String;
  orderDetails: [
    {
      productId: { type: String };
      productPrice: { type: Number };
      quantity: { type: Number };
    }
  ];
  date: string;
  paymentMethod: string;
  totalPrice: Number;
  deliveryDetails: {
    email: { type: String };
    firstName: { type: String };
    lastName: { type: String };
    company: { type: String };
    address: { type: String };
    apartment: { type: String };
    city: { type: String };
    postalCode: { type: String };
    phoneNumber: { type: String };
  };
}
