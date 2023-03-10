const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let catalogueSchema = new Schema(
  {
    title: String,
    price: String,
    description: String,
    productImage: Array,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = {
  Catalogue: model("catalogue", catalogueSchema),
};