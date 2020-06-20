import * as mongoose from 'mongoose';

export interface IComment extends mongoose.Document{
    clientId:mongoose.Schema.Types.String,
    productId:mongoose.Schema.Types.String,
    rating:String
}