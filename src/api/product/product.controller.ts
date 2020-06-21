import { Request, Response } from "express";
import * as mongodb from "mongodb";
import { MongoHelper } from "../../config/mongodb.config";
import ProductSchema from "./product.class";

const getCollection = () => {
  return MongoHelper.client.db("ShopDB").collection("products");
};

export default class ProductController {
  /**
   * Add Product
   * @param productId id of the product
   * @param name name of the product
   * @param category category of the product
   * @param description description of the product
   * @param stocks stocks of the product
   * @param price price of the product
   * @param imageGallery images of products
   * @returns success or failure message
   */

  public addProduct = async (req: Request, res: Response): Promise<any> => {
    const requestData = req.body;
    const collection: any = getCollection();
    const product = new ProductSchema(requestData);

    collection
      .insertOne(product)
      .then(() => {
        res.send({ message: "Successfully Added" });
        res.end();
      })
      .catch((err) => {
        res.send({ message: "Unable to Add" });
        console.error(err);
      });
  };

  /**
   * Update Product
   * @param productId id of the product
   * @param name name of the product
   * @param category category of the product
   * @param description description of the product
   * @param stocks stocks of the product
   * @param price price of the product
   * @param imageGallery images of products
   * @returns success or failure message
   */
  public updateProduct = async (req: Request, res: Response): Promise<any> => {
    const {
      productId,
      name,
      category,
      description,
      stocks,
      price,
      imageGallery,
    } = req.body;
    const collection: any = getCollection();

    collection
      .findOneAndUpdate(
        {
          _id: new mongodb.ObjectId(productId),
        },
        {
          $set: {
            name: name,
            category: category,
            description: description,
            stocks: stocks,
            price: price,
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
  };

  /**
   * Delete Product
   * @param productId id of the product
   * @returns success or failure message
   */
  public deleteProduct = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    const productId = req.params.id;

    collection
      .remove({ _id: new mongodb.ObjectId(productId) })
      .then((result) => {
        console.log(result);
        res.send("Successfully Deleted!");
      })
      .catch((err) => {
        res.send("Unable to delete!");
        console.error(err);
      });
  };

  /**
   * Get Product by Id
   * @param productID id of the product
   * @returns product json
   */
  public getProductByID = async (req: Request, res: Response): Promise<any> => {
    const product = req.params.id;
    const collection: any = getCollection();
    collection
      .findOne({ productId: product })
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        console.error("Unable to find this product");
      });
  };

  /**
   * Get Products
   * @returns product list or failure message
   */
  public getProducts = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    collection.find({}).toArray((err, items) => {
      if (err) {
        res.status(500);
        res.end();
        console.error("Caught error", err);
      } else {
        items = items.map((item) => {
          return {
            id: item._id,
            productId:item.productId,
            name: item.name,
            category: item.category,
            description: item.description,
            stocks: item.stocks,
            price: item.price,
            imageGallery: item.imageGallery,
          };
        });
        res.json(items);
      }
    });
  };

  /**
   * Set Discounts
   * @param discount discount of the product
   * @returns Success or failure message
   */
  public setDiscount = async (req: Request, res: Response): Promise<any> => {
    const collection: any = getCollection();
    const { discount, productId } = req.body;

    collection
      .findOneAndUpdate(
        { productId: productId },
        {
          $set: {
            discount: discount,
          },
        }
      )
      .then(() => {
        res.send("Discount Added for the Product!");
        console.log(res);
      })
      .catch((err) => {
        res.send("Something Went Wrong!");
        console.log(err);
      });
  };
}
