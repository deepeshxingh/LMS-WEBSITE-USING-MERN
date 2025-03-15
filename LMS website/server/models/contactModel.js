import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  purpose: {
    type: String,
    enum: ["Course Enquiry", "Technical Support"], // Case-sensitive issue
    required: true,
  },
},{
  timestamps: true,  
 
});

export default mongoose.model("Contact", contactSchema);
