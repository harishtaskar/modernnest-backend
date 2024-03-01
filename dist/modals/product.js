"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    availability: {
        type: [String],
        required: [true, "availability is required"],
    },
    brand: {
        type: String,
        required: [true, "brand is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    document: {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        path: {
            type: String,
            required: [true, "path is required"],
        },
        type: {
            type: String,
            required: [true, "type is required"],
        },
    },
    images: [
        {
            name: {
                type: String,
                required: [true, "name is required"],
            },
            path: {
                type: String,
                required: [true, "path is required"],
            },
            type: {
                type: String,
                required: [true, "type is required"],
            },
        },
    ],
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    productLinks: {
        type: [String],
        required: [true, "product links is required"],
    },
    productTags: {
        type: [String],
        required: [true, "product links is required"],
    },
    name: {
        type: String,
        required: [true, "product links is required"],
    },
    returnpolicy: {
        type: String,
        required: [true, "string is required"],
    },
    quantity: {
        type: Number,
        required: [true, "string is required"],
    },
    specification: {
        type: String,
        required: [true, "string is required"],
    },
    warrantyinfo: {
        type: String,
        required: [true, "string is required"],
    },
    discount: {
        type: Number,
        required: false,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "sellers",
    },
});
const Products = mongoose_1.models.products || (0, mongoose_1.model)("products", productSchema);
exports.default = Products;
