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
const userRoute = (0, express_1.Router)();
//Checking weather provided email already exists or not
const userExistsEmail = (input) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.ConnectDB)();
    let userExists = false;
    const email = yield users_1.default.findOne({ email: input });
    if (email !== null) {
        console.log("user is" + email);
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
        console.log("user is" + mobile);
        userExists = true;
    }
    return userExists;
});
userRoute.post("/new", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.user;
    console.log(user);
    if (yield userExistsEmail(user.email)) {
        res.status(411).json({
            res: "ERROR",
            msg: "Email Already is Registered",
        });
    }
    else if (yield userExistsMobile(user.mobile)) {
        res.status(411).json({
            res: "ERROR",
            msg: "Mobile Already is Registered",
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
            });
        }
    }
}));
exports.default = userRoute;
