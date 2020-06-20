import * as mongoose from 'mongoose';

export interface IadminLogin extends mongoose.Document {
  id: string;
  email: string;
  password: string;
}
