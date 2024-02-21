"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const database_1 = require("../database/database");
const product_1 = __importDefault(require("../modals/product"));
const productRoute = (0, express_1.Router)();
productRoute.post("/add", authentication_1.sellerAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body.product;
        yield (0, database_1.ConnectDB)();
        const newProduct = new product_1.default(product);
        yield newProduct.save();
        res.status(200).json({
            res: "ok",
            msg: "Product Added Successfully",
            poduct: newProduct,
        });
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Invalid input types" + error,
        });
    }
}));
productRoute.patch("/update", authentication_1.sellerAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body.update;
        const id = req.query.id;
        try {
            yield (0, database_1.ConnectDB)();
            const newUpdate = yield product_1.default.findOneAndUpdate({ _id: id }, update);
            res.status(200).json({
                res: "ok",
                update: newUpdate,
            });
        }
        catch (error) {
            res.status(411).json({
                res: "Error",
                msg: "Error While Updating Product",
            });
        }
    }
    catch (error) {
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
}));
productRoute.delete("/delete", authentication_1.sellerAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.headers.id;
        yield (0, database_1.ConnectDB)();
        yield product_1.default.findByIdAndDelete(id);
        res.status(200).json({
            res: "ok",
            msg: "Product Deleted Successfully",
        });
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Invalid Input Types",
            error: error,
        });
    }
}));
productRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        yield (0, database_1.ConnectDB)();
        const product = yield product_1.default.findById(id);
        res.status(200).json({
            res: "ok",
            msg: "Product Fetch Successfully",
            product: product,
        });
    }
    catch (error) {
        res.status(411).json({
            res: "ERROR",
            msg: "Invalid Input Type",
            error: error,
        });
    }
}));
productRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter || "";
        yield (0, database_1.ConnectDB)();
        const products = yield product_1.default.find({
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
    }
    catch (error) {
        res.status(411).json({
            res: "ERROR",
            msg: "Something went wrong",
            error: error,
        });
    }
}));
exports.default = productRoute;
