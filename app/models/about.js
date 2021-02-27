const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    
    heading: String,
    yourName: String,
    brandName: String,
    yourPhoto: String,
    brandPhoto: String,
    yourVideo: String,
    brandVideo: String,
    yourInfo: String,
    brandInfo: String,
    description: String
  },

  {
    collection: "meta"
  }
);

aboutSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("About", aboutSchema);
