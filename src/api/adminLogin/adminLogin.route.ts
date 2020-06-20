import { Router } from "express";
import Controller from "./adminLogin.controller";

const adminLogin: Router = Router();
const controller = new Controller();


adminLogin.get("/", (req, res) => {
  res.send("Response from Client NodeTS Server");
});

// Client Login 
adminLogin.post("/login",controller.AdminLogin);

export default adminLogin;
