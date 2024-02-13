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
const database_1 = require("../database/database");
const sellers_1 = __importDefault(require("../modals/sellers"));
const sellerRoute = (0, express_1.Router)();
//Checking weather provided email already exists or not
const sellerExistsEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.ConnectDB)();
    let userExists = false;
    const email = yield sellers_1.default.findOne({ "business.email": input });
    console.log("---email" + email);
    if (email !== null) {
        userExists = true;
    }
    return userExists;
});
//Checking weather provided mobile Number already exists or not
const sellerExistsMobile = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.ConnectDB)();
    let userExists = false;
    const mobile = yield sellers_1.default.findOne({ "business.contact": input });
    console.log("---mobile" + mobile);
    if (mobile !== null) {
        userExists = true;
    }
    return userExists;
});
//Registering new Seller
sellerRoute.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body.user;
        if (yield sellerExistsEmail(user.business.email)) {
            res.status(200).json({
                res: "Error",
                msg: "Email Already Registered",
            });
        }
        else if (yield sellerExistsMobile(user.business.contact)) {
            res.status(200).json({
                res: "Error",
                msg: "Mobile Already Registered",
            });
        }
        else {
            try {
                yield (0, database_1.ConnectDB)();
                const newSeller = new sellers_1.default(user);
                yield newSeller.save();
                res.status(200).json({
                    res: "ok",
                    msg: " 🔥 New Seller Registered Successfully",
                });
            }
            catch (error) {
                res.status(411).json({
                    res: "Error",
                    msg: "Something went wrong",
                });
            }
        }
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Invalid input types",
        });
    }
}));
exports.default = sellerRoute;
