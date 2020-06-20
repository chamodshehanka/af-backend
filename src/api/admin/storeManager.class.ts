import * as mongoose from "mongoose";
import { IstoreManager } from "./storeManager.interface";

export const storeManagerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  storeManagerId: { type: String, required: true },
  name: { type: String, required: true },
  email:  {type:String, required: true},
  password: {type:String, required: true},
  contactNo: {type:Number, required: true}
});

const storeManager = mongoose.model<IstoreManager>("storeManager", storeManagerSchema);
export default storeManager;
