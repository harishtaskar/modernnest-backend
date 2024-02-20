import { Router } from "express";
import { ConnectDB } from "../database/database";
import Seller from "../modals/sellers";
import { jwtpassword } from "../config";
import jwt from "jsonwebtoken";
import { sellerAuthentication } from "../middlewares/authentication";

const sellerRoute = Router();

//Checking weather provided email already exists or not
const sellerExistsEmail = async (input: string) => {
  await ConnectDB();
  let userExists = false;
  const email = await Seller.findOne({ "business.email": input });
  if (email !== null) {
    userExists = true;
  }
  return userExists;
};

//Checking weather provided mobile Number already exists or not
const sellerExistsMobile = async (input: string) => {
  await ConnectDB();
  let userExists = false;
  const mobile = await Seller.findOne({ "business.contact": input });
  if (mobile !== null) {
    userExists = true;
  }
  return userExists;
};

//Registering new Seller
sellerRoute.post("/signup", async (req, res) => {
  try {
    const user = req.body.user;
    if (await sellerExistsEmail(user.business.email)) {
      res.status(200).json({
        res: "Error",
        msg: "Email Already Registered",
      });
    } else if (await sellerExistsMobile(user.business.contact)) {
      res.status(200).json({
        res: "Error",
        msg: "Mobile Already Registered",
      });
    } else {
      try {
        await ConnectDB();
        const newSeller = new Seller(user);
        await newSeller.save();
        res.status(200).json({
          res: "ok",
          msg: " 🔥 New Seller Registered Successfully",
        });
      } catch (error) {
        res.status(411).json({
          res: "Error",
          msg: "Something went wrong",
          error: error,
        });
      }
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid input types" + error,
    });
  }
});

//login Seller
sellerRoute.get("/signin", async (req, res) => {
  try {
    const email = req.headers.email;
    const password = req.headers.password;
    await ConnectDB();
    const user = await Seller.findOne({ "business.email": email });
    if (user && user.password === password) {
      const token = jwt.sign({ email: email, status: "seller" }, jwtpassword);
      res.status(200).json({
        res: "ok",
        msg: " 🚀 Login Successfull",
        token: `Bearer ${token}`,
        user: user,
      });
    } else {
      res.status(200).json({
        res: "Error",
        msg: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid input types" + error,
    });
  }
});

//Existing Seller Details
sellerRoute.get("/", sellerAuthentication, async (req: any, res) => {
  try {
    const email = req.email;
    await ConnectDB();
    const user = await Seller.findOne({ "business.email": email });
    if (user !== null) {
      res.status(200).json({
        res: "ok",
        msg: "User fetch successfully",
        user: user,
      });
    } else {
      res.status(200).json({
        res: "Error",
        msg: "Seller Not Exists",
      });
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Error fetching seller details",
      error: error
    });
  }
});

sellerRoute.patch("/update", sellerAuthentication, async (req: any, res) => {
  try {
    const update = req.body.update;
    const email = req.email;
    try {
      await ConnectDB();
      await Seller.findOneAndUpdate({ "business.email": email }, update);

      const updatedUser = await Seller.findOne({ "business.email": email });

      res.status(200).json({
        res: "ok",
        update: updatedUser,
      });
    } catch (error) {
      res.status(411).json({
        res: "Error",
        msg: "Error While Updating Seller Profile",
      });
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid Input Types",
      type: {
        update: {
          "business.email": "Something",
        },
      },
      error: error,
    });
  }
});

sellerRoute.delete("/delete", sellerAuthentication, async (req: any, res) => {
  try {
    const email = req.email;
    await ConnectDB();
    await Seller.findOneAndDelete({ "business.email": email });
    res.status(200).json({
      res: "ok",
      msg: "Profile Deleted Successfully",
    });
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid Input Types",
      error: error,
    });
  }
});

export default sellerRoute;
