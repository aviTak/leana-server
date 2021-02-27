const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testimonialSchema = new Schema(
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
    collection: "testimonials"
  }
);

testimonialSchema.index({ name: "text", designation: "text" });

module.exports = mongoose.model("Testimonial", testimonialSchema);
