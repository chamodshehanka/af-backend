import { Request, Response } from 'express';
import { MongoHelper } from '../../config/mongodb.config';
import OrderSchema from './order.class';
import CartController from '../cart/cart.controller';

const getCollection = () => {
  return MongoHelper.client.db('ShopDB').collection('orders');
};

const getCartCollection = () => {
  return MongoHelper.client.db('ShopDB').collection('carts');
};

export default class OrderController {
  /**
   * Add Order
   * @param orderId id of the order
   *
   *  @returns success or error message
   */
  public addOrder = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    const reqData = req.body;

    // Get Cart Data
    const cartCollection: any = getCartCollection();
    const clientId = reqData.clientId;

    let cart = await cartCollection.findOne({ clientId });
    let orderId = Math.random().toString(36).substring(7);

    const order = new OrderSchema({
      orderId: orderId,
      clientId: clientId,
      orderDetails: cart.items,
      date: new Date(),
      paymentMethod: reqData.paymentMethod,
      totalPrice: reqData.totalPrice,
      deliveryDetails: reqData.deliveryDetails,
    });

    collection
      .insertOne(order)
      .then(() => {
        if (cart !== null) {
          collection
            .findOneAndUpdate(
              { clientId: clientId },
              {
                $set: {
                  items: [],
                },
              }
            )
            .then(() => {
              // res.send(cart);
              console.log('cart reset');
              const cartController = new CartController();
              cartController.cartReset(clientId);
            });
        }
        // move
        res.send({ success: true, message: 'Successfully Added' });
        res.end();
      })
      .catch((err) => {
        res.send({ success: false, message: 'Unable to Add' });
        console.error(err);
      });
  };
}
