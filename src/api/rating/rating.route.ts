import { Router } from "express";
import Controller from "./rating.controller";

const ratings: Router = Router();
const controller = new Controller();

//Add Rating
ratings.post("/add", controller.addRating);

//Update Rating
ratings.put("/update", controller.updateRating);

//Delete Rating
ratings.post("/delete", controller.deleteRating);

//Get Ratings by Product Id
ratings.get("/get/:id", controller.getRatingsById);

//Get Ratings by Product Id and Client Id
ratings.post("/getByUser", controller.getRatingsByUser);


export default ratings;