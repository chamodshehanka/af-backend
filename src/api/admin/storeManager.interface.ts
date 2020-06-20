import * as mongoose from 'mongoose';

export interface IstoreManager extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  contactNo: number;
}
