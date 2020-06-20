import { Router } from "express";
import Controller from "./comment.controller";

const comments: Router = Router();
const controller = new Controller();

//Add Comment
comments.post("/add", controller.addComment);

//Update Comment
comments.put("/update", controller.updateComment);

//Delete Comment
comments.post("/delete", controller.deleteComment);

//Get Comments by Product Id
comments.get("/get/:id", controller.getCommentsById);

//Get Comment by Product Id and Client Id
comments.post("/get", controller.getCommentsByUser);


export default comments;