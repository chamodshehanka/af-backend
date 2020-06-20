import { Request, Response } from 'express';
import * as mongodb from 'mongodb';
import { MongoHelper } from '../../config/mongodb.config';

const getCollection = () => {
  return MongoHelper.client.db('ShopDB').collection('admin');
};

const webtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class adminLoginController {

  /**
   * SignIn admin
   * @param email
   * @returns token or failure message
   */
  public login = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    console.log(req.body);
    collection
      .findOne({ email: req.body.email })
      .then(async (user) => {
        if (user != null) {
          if (await bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              email: user.email,
            };

            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1140,
            });
            console.log(token);
            res.status(200).send(token);
          } else {
            res.status(400).json({ error: 'Incorrect Password' });
          }
        } else {
          res.status(400).json({ error: 'User Does Not Exists' });
        }
      })
      .catch((err) => {
        res.send('Something Went Wrong');
        console.error(err);
      });
  };
}



