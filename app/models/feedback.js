const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },
    
    email: String,
    phone: String,
    website: String,
    date: String
  },

  {
    collection: "feedbacks"
  }
);

feedbackSchema.index({ name: "text", message: "text" } );

module.exports = mongoose.model("Feedback", feedbackSchema);
