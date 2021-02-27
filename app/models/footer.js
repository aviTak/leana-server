const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const footerSchema = new Schema(
  {    
    type: {
      type: String,
      required: true
    },
    
    copyName: String,
    copyYear: String,
    privacy: String,
    terms: String,
    disclaimer: String
  },

  {
    collection: "meta"
  }
);

footerSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Footer", footerSchema);
