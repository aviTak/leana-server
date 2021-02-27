const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creatorSchema = new Schema(
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
    collection: "creators"
  }
);

creatorSchema.index({ name: "text", designation: "text" });

module.exports = mongoose.model("Creator", creatorSchema);
