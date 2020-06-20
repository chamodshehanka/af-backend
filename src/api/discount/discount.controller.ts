import { Request, Response } from 'express';
import { MongoHelper } from '../../config/mongodb.config';

const getCollection = () => {
  return MongoHelper.client.db('ShopDB').collection('discounts');
};

export default class DiscountController {
  /**
   * @param code code of the discount
   * @returns true or false
   */
  public isValidDiscountCode = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const code = req.body;
    const collection: any = getCollection();

    collection
      .findOne({ code: code })
      .then(() => {
        res.send({ isValid: true });
      })
      .catch(() => {
        res.send({ isValid: false });
      });
  };
}
