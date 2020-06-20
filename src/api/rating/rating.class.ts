import * as mongoose from 'mongoose';
import {IRating} from './rating.interface';

export const RatingSchema = new mongoose.Schema({
    clientId:{   type:mongoose.Schema.Types.String,
        ref:"Client"},
    productId:{   type:mongoose.Schema.Types.String,
            ref:"Product"},
    rating:{type:Number,required:true}
});

const Rating = mongoose.model<IRating>("Rating",RatingSchema);
export default Rating;