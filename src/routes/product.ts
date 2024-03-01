import { Router } from "express";
import { sellerAuthentication } from "../middlewares/authentication";
import { ConnectDB } from "../database/database";
import Products from "../modals/product";

const productRoute = Router();

productRoute.post("/add", sellerAuthentication, async (req, res) => {
  try {
    const product = req.body.product;
    const id = req.headers._id;
    await ConnectDB();
    const newProduct = new Products({ ...product, seller: id });
    await newProduct.save();
    res.status(200).json({
      res: "ok",
      msg: "Product Added Successfully",
      poduct: newProduct,
    });
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid input types" + error,
    });
  }
});

productRoute.patch("/update", sellerAuthentication, async (req, res) => {
  try {
    const update = req.body.update;
    const id = req.headers.prod_id;
    try {
      await ConnectDB();
      const newUpdate = await Products.findOneAndUpdate({ _id: id }, update);
      res.status(200).json({
        res: "ok",
        update: newUpdate,
      });
    } catch (error) {
      res.status(411).json({
        res: "Error",
        msg: "Error While Updating Product",
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

productRoute.delete("/delete", sellerAuthentication, async (req, res) => {
  try {
    const id = req.headers.id;
    await ConnectDB();
    // await Products.findByIdAndDelete(id);
    res.status(200).json({
      res: "ok",
      msg: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(411).json({
      res: "Error",
      msg: "Invalid Input Types",
      error: error,
    });
  }
});

productRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await ConnectDB();
    const product = await Products.findById(id);
    console.log(id);

    res.status(200).json({
      res: "ok",
      msg: "Product Fetch Successfully",
      product: product,
    });
  } catch (error) {
    res.status(411).json({
      res: "ERROR",
      msg: "Invalid Input Type",
      error: error,
    });
  }
});

productRoute.get("/", async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const id = req.headers._id;
    await ConnectDB();
    const products = await Products.find({
      seller: id,
      $or: [
        { brand: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } },
        { name: { $regex: filter, $options: "i" } },
      ],
    });
    res.status(200).json({
      res: "ok",
      msg: "All Products Fetch Successfully",
      products: products,
    });
  } catch (error) {
    res.status(411).json({
      res: "ERROR",
      msg: "Something went wrong",
      error: error,
    });
  }
});

export default productRoute;
