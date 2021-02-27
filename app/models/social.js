const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const socialSchema = new Schema(
  {
    
    type: {
      type: String,
      required: true
    },
    
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    pinterest: String,
    youtube: String,
    whatsapp: String,
    tumblr: String,
    quora: String,
    medium: String,
    github: String,
    codepen: String,
    behance: String,
    dribbble: String,
    yourQuote: String
  },

  {
    collection: "meta"
  }
);

socialSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Social", socialSchema);
