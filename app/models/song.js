const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    coverPhoto: String,
    song: String,
    creatorId: String,
    categoryId: String,
    tags: [String],
    summary: String,
    credits: String
  },

  {
    collection: "songs"
  }
);

songSchema.index({ title: "text", summary: "text" });

module.exports = mongoose.model("Song", songSchema);
