import { jwtpassword } from "../config";
import jwt from "jsonwebtoken";

export const userAuthentication = (req: any, res: any, next: any) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    console.log(auth);
    console.log(token);

    try {
      if (token) {
        const verify: any = jwt.verify(token, jwtpassword);
        if (verify.status === "user") {
          req.email = verify.email;
          next();
        } else {
          res.status(200).json({
            res: "Error",
            msg: "Invalid Credentials for user",
          });
        }
      } else {
        res.status(200).json({
          res: "Error",
          msg: "Invalid auth token",
        });
      }
    } catch (error) {
      res.status(411).json({
        res: "Error",
        msg: "Error varifying auth token" + token,
      });
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid Auth Token" + error,
    });
  }
};

export const sellerAuthentication = (req: any, res: any, next: any) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    console.log(auth);
    console.log(token);

    try {
      if (token) {
        const verify: any = jwt.verify(token, jwtpassword);
        if (verify.status === "seller") {
          req.email = verify.email;
          next();
        } else {
          res.status(200).json({
            res: "Error",
            msg: "Invalid Credentials for seller",
          });
        }
      } else {
        res.status(200).json({
          res: "Error",
          msg: "Invalid auth token",
        });
      }
    } catch (error) {
      res.status(411).json({
        res: "Error",
        msg: "Error varifying auth token" + token,
      });
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid Auth Token" + error,
    });
  }
};
