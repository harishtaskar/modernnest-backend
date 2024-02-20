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
const users_1 = __importDefault(require("../modals/users"));
const authentication_1 = require("../middlewares/authentication");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userRoute = (0, express_1.Router)();
//Checking weather provided email already exists or not
const userExistsEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.ConnectDB)();
    let userExists = false;
    const email = yield users_1.default.findOne({ email: input });
    if (email !== null) {
        userExists = true;
    }
    return userExists;
});
//Checking weather provided mobile Number already exists or not
const userExistsMobile = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.ConnectDB)();
    let userExists = false;
    const mobile = yield users_1.default.findOne({ mobile: input });
    if (mobile !== null) {
        userExists = true;
    }
    return userExists;
});
// Register new user
userRoute.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    if (yield userExistsEmail(user.email)) {
        res.status(411).json({
            res: "ERROR",
            msg: "Email Already Registered",
        });
    }
    else if (yield userExistsMobile(user.mobile)) {
        res.status(411).json({
            res: "ERROR",
            msg: "Mobile Already Registered",
        });
    }
    else {
        try {
            yield (0, database_1.ConnectDB)();
            const newUser = new users_1.default(user);
            newUser.save();
            res.status(200).json({
                res: "ok",
                msg: " 🔥 User Registered Successfully",
            });
        }
        catch (error) {
            res.status(411).json({
                res: "ERROR",
                msg: "Error Adding New User",
                error: error,
            });
        }
    }
}));
// User Login
userRoute.get("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.headers.email;
        const password = req.headers.password;
        yield (0, database_1.ConnectDB)();
        const user = yield users_1.default.findOne({ email: email });
        if (user && user.password === password) {
            const token = jsonwebtoken_1.default.sign({ email: user.email, status: "user" }, config_1.jwtpassword);
            res.status(200).json({
                res: "ok",
                msg: " 🚀 Login Successfull",
                token: `Bearer ${token}`,
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
            msg: "Something went wrong, Please check input",
            error: error,
        });
    }
}));
// existing user details
userRoute.get("/", authentication_1.userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        yield (0, database_1.ConnectDB)();
        const user = yield users_1.default.findOne({ email: email });
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
                msg: "User Not Exists",
            });
        }
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Error fetching user details",
            error: error,
        });
    }
}));
userRoute.patch("/update", authentication_1.userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body.update;
        const email = req.email;
        try {
            yield (0, database_1.ConnectDB)();
            const newUpdate = yield users_1.default.findOneAndUpdate({ email: email }, update);
            res.status(200).json({
                res: "ok",
                update: newUpdate,
            });
        }
        catch (error) {
            res.status(411).json({
                res: "Error",
                msg: "Error While Updating User Profile",
                error: error,
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
userRoute.delete("/delete", authentication_1.userAuthentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.email;
        yield (0, database_1.ConnectDB)();
        yield users_1.default.findOneAndDelete({ email: email });
        res.status(411).json({
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
exports.default = userRoute;
