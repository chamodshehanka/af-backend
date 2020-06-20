import * as mongoose from 'mongoose';

export interface ICart extends mongoose.Document {
  clientId: mongoose.Schema.Types.String;
  items: [
    {
      productId: { type: String };
      productPrice: { type: Number };
      quantity: { type: Number };
    }
  ];
}
