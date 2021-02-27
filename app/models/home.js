const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema(
  {
    
    type: {
      type: String,
      required: true
    },
    
    websiteName: {
      type: String,
      required: true
    },
    
    tagline: String,
    logo: String,
    background: String,
    video: String,
    summary: String,
    description: String
  },

  {
    collection: "meta"
  }
);

homeSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Home", homeSchema);
