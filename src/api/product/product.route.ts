import { Router } from "express";
import Controller from "./product.controller";

const products: Router = Router();
const controller = new Controller();

//Add Product
products.post("/add", controller.addProduct);

//Update Product
products.put("/update", controller.updateProduct);

//Delete Product
products.delete("/delete/:id", controller.deleteProduct);

//Get product by id
products.get("/get/:id", controller.getProductByID);

//Get All Products
products.get("/list", controller.getProducts);

//Add discount
products.put("/adddiscount/", controller.setDiscount);

export default products;
