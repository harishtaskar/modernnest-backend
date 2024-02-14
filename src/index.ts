import express from "express";
import userRoute from "./routes/user";
import sellerRoute from "./routes/seller";
import productRoute from "./routes/product";
import cors from "cors";

const PORT = 3000;
const app = express();

require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);
app.use("/seller", sellerRoute);
app.use("/product", productRoute);

app.listen(PORT, () => {
  console.log("Server is Running on port ", PORT);
});
