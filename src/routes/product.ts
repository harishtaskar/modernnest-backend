import { Router } from "express";
import { sellerAuthentication } from "../middlewares/authentication";

const productRoute = Router();

productRoute.post("/add", sellerAuthentication, (req, res) => {
  //logic to add product in database
});

export default productRoute;
