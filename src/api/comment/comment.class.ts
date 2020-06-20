import * as mongoose from 'mongoose';
import {IComment} from './comment.interface';

export const CommentSchema = new mongoose.Schema({
    clientId:{   type:mongoose.Schema.Types.String,
        ref:"Client"},
    productId:{   type:mongoose.Schema.Types.String,
            ref:"Product"},
    comment:{type:String,required:true}
});

const Comment = mongoose.model<IComment>("Comment",CommentSchema);
export default Comment;