const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let productSchema = new Schema(
  {
    title: String,
    catalogueImage: Array,
    productPrice: String,
    description: String,
    productImage: String,
    //the reson for showing any user this product like, new, production from a close friend, promotion, etc
    reason: String,
    productType: {
      type: String,
      enum: ["Dress", "Fabric"],
      default: "Dress",
    },
    postType: {
      type: String,
      enum: ["Product", "Catalogue"],
      default: "Product",
    },
    sizes: { type: Array },
    yards: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = {
  Product: model("product", productSchema),
};
