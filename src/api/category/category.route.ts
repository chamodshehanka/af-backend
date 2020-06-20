import { Router } from "express";
import Controller from "./category.controller";

const categories: Router = Router();
const controller = new Controller();

// need to remove
categories.get("/", (req, res) => {
  res.send("Response from Client NodeTS Server");
});


 // Add Category List
 categories.post("/add", controller.addCategoryList);

 // Update Category List
 categories.put("/update", controller.updateCategoryList);

 // Delete Category List
 categories.delete("/delete/:categoryId", controller.deleteCategoryList);

// Get Category List
categories.get("/list", controller.getCategories);

//Get Featured Category List
categories.get("/featured", controller.getFeaturedCategories);

export default categories;
