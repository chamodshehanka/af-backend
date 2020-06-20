import { Request, Response } from 'express';
import * as mongodb from 'mongodb';
import { MongoHelper } from '../../config/mongodb.config';
import WishListSchema from './wishlist.class';
import ClientController from '../client/client.controller';
import wishLists from './wishlist.route';
import clients from '../client/client.route';

const getCollection = () => {
  return MongoHelper.client.db('ShopDB').collection('wishLists');
};

export default class WishListController {

    /**
     * Add Product To Wishlist
     * @returns success or failure message
     */

     public addProduct = async(req:Request,res:Response): Promise<any> => {
        const {clientId,productId} = req.body;
        const collection: any =  getCollection();
        try{
            let wishList = await collection.findOne({clientId});
            if (wishList!==null) {
                //wish list exists for user
                let itemIndex = wishList.items.findIndex(p => p.productId === productId);
                if (itemIndex > -1) {
                    let productItem = wishList.items[itemIndex];
                    wishList.items[itemIndex] = productItem;
                  } else {
                    //product does not exists in wish list, add new item
                    wishList.items.push({ productId});
                  }
                  await collection.findOneAndUpdate({
                      clientId:clientId
                  },
                  {
                      $set:{
                          items:wishList.items
                      }
                  }).then(()=>{
                    res.send(wishList);
                  })
                  
                } else {
                  //no wish list for user, create new wish list
                  const newWishList = await collection.insertOne({
                    clientId,
                    items: [{ productId }]
                  });
            
                  return res.status(201).send(newWishList);
            }
          
        }catch(err){
            console.error(err);
            res.send({message:'Something Went Wrong'});
        }
    }

  /**
   * Get WishList
   * @returns a wishlist
   */
  public getWishList = async (req: Request, res: Response): Promise<any> => {
    const { clientID } = req.body;
    const collection: any = getCollection();
    let wishList = await collection.findOne({ clientID });

    res.send(wishList);
  };

  /**
   * Delete Product From Wish List
   * @returns suddess or failure message
   */
  public removeProduct = async (req: Request, res: Response): Promise<any> => {
    const data  = req.body;
    console.log(data)
    const collection: any = getCollection();
    try {
      let wishList = await collection.findOne({clientId:data.clientId });
      console.log(wishList);
      if (wishList !== null) {
        let itemIndex = wishList.items.findIndex(
          (p) => p.productId === data.productId
        );

        wishList.items.splice(itemIndex, 1);
        await collection
          .findOneAndUpdate(
            {
              clientId: data.clientId,
            },
            {
              $set: {
                items: wishList.items,
              },
            }
          )
          .then(() => {
            res.send(wishList);
          });
      } else {
        res.send({ message: 'Unable to Find Wish List' });
      }
    } catch (err) {
      console.error(err);
      res.send({ message: 'Something Went Wrong' });
    }
  };
}
