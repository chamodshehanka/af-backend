import * as mongoose from 'mongoose';

export interface IstoreManager extends mongoose.Document {
  storeManagerId: string;
  name: string;
  email: string;
  password: string;
  contactNo: number;
}
