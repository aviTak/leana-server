const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    photo: String,
    creatorId: String,
    categoryId: String,
    tags: [String],
    summary: String,
    credits: String
  },
  
  {
    collection: "artworks"
  }
);

artworkSchema.index({ title: "text", summary: "text" });

module.exports = mongoose.model("Artwork", artworkSchema);
