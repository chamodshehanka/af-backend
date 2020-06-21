import { Request, Response } from 'express';
import * as mongodb from 'mongodb';
import { MongoHelper } from '../../config/mongodb.config';
import ClientSchema from './client.class';

const webtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';

const getCollection = () => {
  return MongoHelper.client.db('ShopDB').collection('clients');
};

const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: './secrets/malbay-897368b28fe4.json',
  projectId: 'malbay',
});

export default class ClientController {
  /**
   * Add Client
   * @param clientID id of the client
   * @param name name of the client
   * @param email client email address
   * @param contactNo client contactNo
   * @returns success or failure message
   */
  public addClient = async (req: Request, res: Response): Promise<any> => {
    const requestData = req.body;
    const collection: any = getCollection();

    if (await collection.findOne({ email: requestData.email })) {
      res.send({ message: 'User Alredy Registered' });
    } else {
      const hashedPassword = await bcrypt.hash(requestData.password, 10);
      requestData.password = hashedPassword;
      const client = new ClientSchema(requestData);

      collection
        .insertOne(client)
        .then(() => {
          res.send({ message: 'Successfully Added' });
          res.end();
        })
        .catch((err) => {
          res.send({ message: 'Unable to Add' });
          console.error(err);
        });
    }
  };

  /**
   * Update Client
   * @param clientID id of the client
   * @param name name of the client
   * @param email client email address
   * @param contactNo client contactNo
   * @returns success or failure message
   */
  public updateClient = async (req: Request, res: Response): Promise<any> => {
    const { clientID, name, email, contactNo } = req.body;
    const collection: any = getCollection();

    collection
      .findOneAndUpdate(
        {
          _id: new mongodb.ObjectId(clientID),
        },
        {
          $set: {
            name: name,
            email: email,
            contactNo: contactNo,
          },
        }
      )
      .then(() => {
        res.send({ message: 'Succesfully Updated' });
      })
      .catch((err) => {
        res.send({ message: 'Unable to Update' });
        console.error(err);
      });
  };

  /**
   * @param clientID id of the client
   * @returns success or error message
   */
  public deleteClient = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    const { clientID } = req.body;
    collection
      .remove({ _id: new mongodb.ObjectId(clientID) })
      .then((result) => {
        console.log(result);
        res.send('Successfully Deleted!');
      })
      .catch((err) => {
        res.send('Unable to delete!');
        console.error(err);
      });
  };

  /**
   * Get client by id
   * @param clientID id of client
   * @returns client json
   */
  public getClientByID = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();

    collection
      .findOne({ email: req.params.id })
      .then((client) => {
        res.send(client);
      })
      .catch((err) => {
        console.error('Unable to find this client');
      });
  };

  /**
   * Get Clients
   * @returns clients list or failure message
   */
  public getClients = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    collection
      .find({})
      .toArray((err, items) => {
        if (err) {
          res.status(500);
          res.end();
          console.error('Caught error', err);
        } else {
          items = items.map((item) => {
            return {
              id: item._id,
              name: item.name,
              email: item.email,
              contactNo: item.contactNo,
            };
          });

          res.json(items);
        }
      })
      .catch((err: any) => {
        res.send('Unable to get clients');
        console.error(err);
      });
  };

  /**
   * SignIn Clients
   * @param email
   * @returns token or failure message
   */
  public signIn = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    collection
      .findOne({ email: req.body.email })
      .then(async (user) => {
        if (user != null) {
          if (await bcrypt.compareSync(req.body.password, user.password)) {
            const payload = {
              clientId:user.clientId,
              name: user.name,
              email: user.email,
              contactNo: user.contactNo,
              profileImage:user.profileImage,
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
