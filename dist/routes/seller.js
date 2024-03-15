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
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication_1 = require("../middlewares/authentication");
const sellerRoute = (0, express_1.Router)();
//Checking weather provided email already exists or not
const sellerExistsEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.ConnectDB)();
    let userExists = false;
    const email = yield sellers_1.default.findOne({ "business.email": input });
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
                    msg: "Registered Successfully",
                });
            }
            catch (error) {
                res.status(411).json({
                    res: "Error",
                    msg: "Something went wrong",
                    error: error,
                });
            }
        }
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Invalid input types" + error,
        });
    }
}));
//login Seller
sellerRoute.get("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.headers.email;
        const password = req.headers.password;
        yield (0, database_1.ConnectDB)();
        const user = yield sellers_1.default.findOne({ "business.email": email });
        if (user && user.password === password) {
            const token = jsonwebtoken_1.default.sign({ email: email, status: "seller" }, config_1.jwtpassword);
            res.status(200).json({
                res: "ok",
                msg: "Login Successfull",
                token: `Bearer ${token}`,
                user: user,
            });
        }
        else {
            res.status(200).json({
                res: "Error",
                msg: "Invalid Credentials",
            });
        }
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Invalid input types" + error,
        });
    }
}));
//Existing Seller Details
sellerRoute.get("/", authentication_1.sellerAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        yield (0, database_1.ConnectDB)();
        const user = yield sellers_1.default.findOne({ "business.email": email });
        if (user !== null) {
            res.status(200).json({
                res: "ok",
                msg: "User fetch successfully",
                user: user,
            });
        }
        else {
            res.status(200).json({
                res: "Error",
                msg: "Seller Not Exists",
            });
        }
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Error fetching seller details",
            error: error,
        });
    }
}));
sellerRoute.patch("/update", authentication_1.sellerAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body.update;
        const email = req.email;
        try {
            yield (0, database_1.ConnectDB)();
            yield sellers_1.default.findOneAndUpdate({ "business.email": email }, update);
            const updatedUser = yield sellers_1.default.findOne({ "business.email": email });
            res.status(200).json({
                res: "ok",
                update: updatedUser,
            });
        }
        catch (error) {
            res.status(411).json({
                res: "Error",
                msg: "Error While Updating Seller Profile",
            });
        }
    }
    catch (error) {
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
}));
sellerRoute.delete("/delete", authentication_1.sellerAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        yield (0, database_1.ConnectDB)();
        yield sellers_1.default.findOneAndDelete({ "business.email": email });
        res.status(200).json({
            res: "ok",
            msg: "Profile Deleted Successfully",
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
exports.default = sellerRoute;
