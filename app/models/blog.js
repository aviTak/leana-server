const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    permalink: {           
      type: String,
      required: true
    },

    coverPhoto: String,
    video: String,
    creatorId: String,
    categoryId: String,
    tags: [String],
    summary: String,
    date: String,
    post: String
  },

  {
    collection: "blogs"
  }
);

blogSchema.index({ title: "text", summary: "text" });
blogSchema.index({ permalink: 1 }, { unique: true });

module.exports = mongoose.model("Blog", blogSchema);
