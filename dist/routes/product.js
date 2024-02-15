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
        });
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Invalid input types" + error,
        });
    }
}));
exports.default = productRoute;
