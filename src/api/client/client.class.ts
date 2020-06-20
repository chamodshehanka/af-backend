import * as mongoose from "mongoose";
import { IClient } from "./client.interface";


export const ClientSchema = new mongoose.Schema({
  id: { type: String, required: true },
  clientId:{type:String,required:true},
  name: { type: String, required: true },
  email: {type:String},
  contactNo: {type:Number},
  password: {type:String},
  salt:{type:String},
  hash:{type:String},
  profileImage:{type:String}

});

const Client = mongoose.model<IClient>("Client", ClientSchema);
export default Client;
