const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    designation: String,
    photo: String,
    video: String,
    summary: String,
    link: String
  },

  {
    collection: "member"
  }
);

memberSchema.index({ name: "text", designation: "text" });

module.exports = mongoose.model("Member", memberSchema);
