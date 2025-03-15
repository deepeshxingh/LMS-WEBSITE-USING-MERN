import Contact from "../models/contactModel.js";

export const submitContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form. Please try again",
      error,
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No contacts found",
      });
    }

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Error in getContact:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteContact:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};
