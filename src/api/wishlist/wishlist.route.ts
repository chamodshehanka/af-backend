import {Router} from "express";
import Controller from "./wishlist.controller";

const wishLists: Router = Router();
const controller = new Controller();

//Get WishList By Client ID
wishLists.get("/get/:id",controller.getWishList);

//Add Product To WishList
wishLists.post("/add",controller.addProduct);

//Remove Prduct From WishList
wishLists.post("/delete",controller.removeProduct);

export default wishLists