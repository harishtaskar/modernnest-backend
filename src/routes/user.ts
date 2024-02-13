import { Router } from "express";
import { ConnectDB } from "../database/database";
import Users from "../modals/users";

const userRoute = Router();

//Checking weather provided email already exists or not
const userExistsEmail = async (input: string) => {
  await ConnectDB();
  let userExists = false;
  const email = await Users.findOne({ email: input });
  if (email !== null) {
    console.log("user is" + email);
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
    console.log("user is" + mobile);
    userExists = true;
  }
  return userExists;
};

userRoute.post("/new", async (req, res) => {
  const user = req.body.user;
  console.log(user);

  if (await userExistsEmail(user.email)) {
    res.status(411).json({
      res: "ERROR",
      msg: "Email Already is Registered",
    });
  } else if (await userExistsMobile(user.mobile)) {
    res.status(411).json({
      res: "ERROR",
      msg: "Mobile Already is Registered",
    });
  } else {
    try {
      await ConnectDB();
      const newUser = new Users(user);
      newUser.save();
      res.status(200).json({
        res: "ok",
        msg: " 🔥 User Registered Successfully",
      });
    } catch (error) {
      res.status(411).json({
        res: "ERROR",
        msg: "Error Adding New User",
      });
    }
  }
});

export default userRoute;
