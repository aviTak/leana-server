const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

     link: {
      type: String,
      required: true
    },
    
    size: String
  },

  {
    collection: "assets"
  }
);

assetSchema.index({ name: "text" });

module.exports = mongoose.model("Asset", assetSchema);
