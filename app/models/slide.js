const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slideSchema = new Schema(
  {
    caption: {
      type: String,
      required: true
    },

    photo: {
      type: String,
      required: true
    }
  },

  {
    collection: "slides"
  }
);

slideSchema.index({ caption: "text" });

module.exports = mongoose.model("Slide", slideSchema);
