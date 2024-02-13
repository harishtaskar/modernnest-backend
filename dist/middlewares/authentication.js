"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthentication = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuthentication = (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    console.log(auth);
    console.log(token);
    try {
        if (token) {
            const verify = jsonwebtoken_1.default.verify(token, config_1.jwtpassword);
            req.email = verify;
            next();
        }
        else {
            res.status(200).json({
                res: "Error",
                msg: "Invalid auth token",
            });
        }
    }
    catch (error) {
        res.status(411).json({
            res: "Error",
            msg: "Error varifying auth token" + token,
        });
    }
};
exports.userAuthentication = userAuthentication;
