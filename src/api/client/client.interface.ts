import * as mongoose from 'mongoose';

export interface IClient extends mongoose.Document {
  id: string;
  clientId: string;
  name: string;
  email: string;
  contactNo: number;
  password: string;
  profileImage:string
}
