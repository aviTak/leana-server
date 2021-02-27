const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    coverPhoto: String,
    video: String,
    creatorId: String,
    categoryId: String,
    tags: [String],
    summary: String,
    credits: String
  },

  {
    collection: "vlogs"
  }
);

vlogSchema.index({ title: "text", summary: "text" });

module.exports = mongoose.model("Vlog", vlogSchema);
