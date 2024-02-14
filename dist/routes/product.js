"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const productRoute = (0, express_1.Router)();
productRoute.post("/add", authentication_1.sellerAuthentication, (req, res) => {
    //logic to add product in database
});
exports.default = productRoute;
