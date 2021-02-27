const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {    
    type: {
      type: String,
      required: true
    },
    
    heading: String,
    info: String,
    
    primaryEmail: String,
    secondaryEmail: String,
    tertiaryEmail: String,
    
    primaryPhone: String,
    secondaryPhone: String,
    tertiaryPhone: String,
    
    name: String,
    flat: String,
    area: String,
    landmark: String,
    
    city: String,
    state: String,
    pin: String,
    
    description: String
  },

  {
    collection: "meta"
  }
);

contactSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model("Contact", contactSchema);
