import * as mongoose from 'mongoose';

export interface IRating extends mongoose.Document{
    clientId:mongoose.Schema.Types.String,
    productId:mongoose.Schema.Types.String,
    rating:Number
}