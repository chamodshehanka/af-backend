import * as mongoose from 'mongoose';

export interface IWishList extends mongoose.Document{
    clientId:mongoose.Schema.Types.String,
    items:[{
        productId:{type:String}
    }]
    totalQuantity:Number
}