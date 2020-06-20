import * as mongoose from "mongoose";
import { IadminLogin } from "./adminLogin.interface";

export const adminLoginSchema = new mongoose.Schema({
  id: { type: String, required: true },
  email:  {type:String, required: true},
  password: {type:String, required: true},
});

const adminLogin = mongoose.model<IadminLogin>("adminLogin", adminLoginSchema);
export default adminLogin;
