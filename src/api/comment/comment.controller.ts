import { Request, Response } from "express";
import * as mongodb from "mongodb";
import { MongoHelper } from "../../config/mongodb.config";
import CommentSchema from "./comment.class";
import comments from "./comment.route";

const getCollection = () => {
    return MongoHelper.client.db("ShopDB").collection("comments");
};

export default class CommentController {

/**
   * Add Comment
   * @param productId id of the product
   * @param clientId id of the client
   * @param comment comment of the client
   * @returns success or failure message
   */

   public addComment = async (req: Request, res: Response): Promise<any> => {
       const requestData = req.body;
       console.log(requestData);
       const collection: any = getCollection();
       const comment = new CommentSchema(requestData);

       collection.insertOne(comment).then( () => {
           res.send({message: "Successfully Added"});
           res.end();
       }).catch( (err) => {
           res.send({ message: "Unable to Add" });
           console.error(err);
       });
   };

   /**
   * Update Comment
   * @param productId id of the product
   * @param clientId id of the client
   * @param comment comment of the client
   * @returns success or failure message
   */
   public updateComment = async (req: Request, res: Response): Promise<any> => {
    const { clientId, productId, comment} = req.body;
    const collection: any = getCollection();

    collection
      .findOneAndUpdate(
        {
          clientId: clientId,
          productId:productId
        },
        {
          $set: {
            comment:comment
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
   * Delete Comment
   * @param productId id of the product
   * @param clientId id of the client
   * @returns success or failure message
   */
   public deleteComment = async (req: Request, res: Response): Promise<any> => {
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
   * Get Comments by Id
   * @param productId id of the product
   * @returns comments json
   */
  public getCommentsById = async (req: Request, res: Response): Promise<any> => {
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
                comment: item.comment,
              };
            });
            res.json(items);
          }
      })
      .then((comments) => {
        res.send(comments);
      })
      .catch((err) => {
        console.error("Unable to find comments for the product");
      });
  };
   

     /**
   * Get Comment
   * @param productId id of the product
   * @param clientId id of the client
   * @returns success or failure message
   */
  public getCommentsByUser = async (req: Request, res: Response): Promise<any> => {
    const { clientId, productId} = req.body;
    const collection: any = getCollection();

    collection
      .findOne(
        {
          clientId: clientId,
          productId:productId
        }
      )
      .then((comment) => {
        res.send(comment);
      })
      .catch((err) => {
        res.send({ message: "Unable to Fetch" });
        console.error(err);
      });
   }
}

