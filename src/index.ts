import express from "express";
import userRoute from "./routes/user";

const PORT = 3000;
const app = express();

require("dotenv").config();
app.use(express.json());

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log("Server is Running on port ", PORT);
});
