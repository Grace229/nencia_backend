const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let catalogueSchema = new Schema(
  {
    
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
