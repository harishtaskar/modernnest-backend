import { Router } from "express";
import { ConnectDB } from "../database/database";
import Users from "../modals/users";
import { userAuthentication } from "../middlewares/authentication";
import jwt from "jsonwebtoken";
import { jwtpassword } from "../config";

const userRoute = Router();

//Checking weather provided email already exists or not
const userExistsEmail = async (input: string) => {
  await ConnectDB();
  let userExists = false;
  const email = await Users.findOne({ email: input });
  if (email !== null) {
    userExists = true;
  }
  return userExists;
};

//Checking weather provided mobile Number already exists or not
const userExistsMobile = async (input: string) => {
  await ConnectDB();
  let userExists = false;
  const mobile = await Users.findOne({ mobile: input });
  if (mobile !== null) {
    userExists = true;
  }
  return userExists;
};

// Register new user
userRoute.post("/signup", async (req, res) => {
  const user = req.body.user;

  if (await userExistsEmail(user.email)) {
    res.status(411).json({
      res: "ERROR",
      msg: "Email Already Registered",
    });
  } else if (await userExistsMobile(user.mobile)) {
    res.status(411).json({
      res: "ERROR",
      msg: "Mobile Already Registered",
    });
  } else {
    try {
      await ConnectDB();
      const newUser = new Users(user);
      newUser.save();
      res.status(200).json({
        res: "ok",
        msg: "User Registered Successfully",
      });
    } catch (error) {
      res.status(411).json({
        res: "ERROR",
        msg: "Error Adding New User",
        error: error,
      });
    }
  }
});

// User Login
userRoute.get("/signin", async (req, res) => {
  try {
    const email = req.headers.email;
    const password = req.headers.password;
    await ConnectDB();
    const user = await Users.findOne({ email: email });
    if (user && user.password === password) {
      const token = jwt.sign(
        { email: user.email, status: "user" },
        jwtpassword
      );
      res.status(200).json({
        res: "ok",
        msg: "Login Successfull",
        token: `Bearer ${token}`,
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
      msg: "Something went wrong, Please check input",
      error: error,
    });
  }
});

// existing user details
userRoute.get("/", userAuthentication, async (req: any, res) => {
  try {
    const email = req.email;
    await ConnectDB();
    const user = await Users.findOne({ email: email });
    if (user !== null) {
      res.status(200).json({
        res: "ok",
        msg: "User fetch successfully",
        user: user,
      });
    } else {
      res.status(200).json({
        res: "Error",
        msg: "User Not Exists",
      });
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Error fetching user details",
      error: error,
    });
  }
});

userRoute.patch("/update", userAuthentication, async (req: any, res) => {
  try {
    const update = req.body.update;
    const email = req.email;
    try {
      await ConnectDB();
      const newUpdate = await Users.findOneAndUpdate({ email: email }, update);
      res.status(200).json({
        res: "ok",
        update: newUpdate,
        msg: "Profile Updated Successfully",
      });
    } catch (error) {
      res.status(411).json({
        res: "Error",
        msg: "Error While Updating User Profile",
        error: error,
      });
    }
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid Input Types",
      type: {
        update: {
          field: "value",
        },
      },
      error: error,
    });
  }
});

userRoute.delete("/delete", userAuthentication, async (req: any, res) => {
  try {
    const email = req.email;
    await ConnectDB();
    await Users.findOneAndDelete({ email: email });
    res.status(411).json({
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

export default userRoute;
