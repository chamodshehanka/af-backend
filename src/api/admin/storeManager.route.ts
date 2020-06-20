import { Router } from "express";
import Controller from "./storeManager.controller";

const storeManager: Router = Router();
const controller = new Controller();

// need to remove
storeManager.get("/", (req, res) => {
  res.send("Response from Client NodeTS Server");
});

// Add storeManager
storeManager.post("/add", controller.addStoreManager);

// Update storeManager
storeManager.put("/update", controller.updateStoreManager);

// Delete storeManager
storeManager.delete("/delete", controller.deleteStoreManager);

// Get storeManager By ID
storeManager.get("/get", controller.getStoreManagerByID);

//Get storeManager List
storeManager.get("/list", controller.getStoreManager);

// Client Login
storeManager.post("/login",controller.login);

export default storeManager;
