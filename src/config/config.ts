import * as dotenv from "dotenv";
dotenv.config();

export default {
  PORT: "4000",
  MONGO_DB_URI:
    "mongodb+srv://chamod:afmongodb@afcluster-mig7i.gcp.mongodb.net/ShopDB?retryWrites=true&w=majority"
};
