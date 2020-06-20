import { Request, Response } from "express";
import * as mongodb from "mongodb";
import { MongoHelper } from "../../config/mongodb.config";
import RatingSchema from "./rating.class";

const getCollection = () => {
    return MongoHelper.client.db("ShopDB").collection("ratings");
};

export default class RatingController {

/**
   * Add Rating
   * @param productId id of the product
   * @param clientId id of the client
   * @param rating rating given by the client
   * @returns success or failure message
   */

   public addRating = async (req: Request, res: Response): Promise<any> => {
       const requestData = req.body;
       const collection: any = getCollection();
       const rating = new RatingSchema(requestData);

       collection.insertOne(rating).then( () => {
           res.send({message: "Successfully Added"});
           res.end();
       }).catch( (err) => {
           res.send({ message: "Unable to Add" });
           console.error(err);
       });
   };

   /**
   * Update Rating
   * @param productId id of the product
   * @param clientId id of the client
   * @param rating rating given by the client
   * @returns success or failure message
   */
   public updateRating = async (req: Request, res: Response): Promise<any> => {
    const { clientId, productId, rating} = req.body;
    const collection: any = getCollection();

    collection
      .findOneAndUpdate(
        {
          clientId: clientId,
          productId:productId
        },
        {
          $set: {
            rating:rating
          },
        }
      )
      .then(() => {
        res.send({ message: "Succesfully Updated" });
      })
      .catch((err) => {
        res.send({ message: "Unable to Update" });
        console.error(err);
      });
   }

   /**
   * Get Rating
   * @param productId id of the product
   * @param clientId id of the client
   * @returns success or failure message
   */
  public getRatingsByUser = async (req: Request, res: Response): Promise<any> => {
    const requestData = req.body;
    const collection: any = getCollection();
    collection
      .findOne(
        {
          clientId: requestData.clientId,
          productId:requestData.productId
        }
      )
      .then((rating) => {
        res.send(rating);
      })
      .catch((err) => {
        res.send({ message: "Unable to Fetch" });
        console.error(err);
      });
   }

   /**
   * Delete Rating
   * @param productId id of the product
   * @param clientId id of the client
   * @returns success or failure message
   */
   public deleteRating = async (req: Request, res: Response): Promise<any> => {
       const collection: any = getCollection();
       const { clientId,productId } = req.body;

       collection.remove({clientId:clientId,productId: productId}).then( (result) => {
           res.send("Successfully Deleted!");
       }).catch( (err) => {
           res.send("Unable to delete!");
           console.error(err);
       });
   };

   /**
   * Get Rating by Id
   * @param productId id of the product
   * @returns comments json
   */
  public getRatingsById = async (req: Request, res: Response): Promise<any> => {
    const product = req.params.id;
    const collection: any = getCollection();
    collection
      .find({productId:product})
      .toArray((err,items)=>{
        if (err) {
            res.status(500);
            res.end();
            console.error("Caught error", err);
          } else {
            items = items.map((item) => {
              return {
                clientId: item.clientId,
                productId: item.productId,
                rating: item.rating,
              };
            });
            res.json(items);
          }
      })
      .then((ratings) => {
        res.send(ratings);
      })
      .catch((err) => {
        console.error("Unable to find ratings for the product");
      });
  };
   

}

