const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    photo: String,
    video: String,
    summary: String,
    link: String
  },
  
  {
    collection: "categories"
  }
);

categorySchema.index({ name: "text", summary: "text" });

module.exports = mongoose.model("Category", categorySchema);
