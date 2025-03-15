import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch contacts when the component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/contact");
      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (err) {
      setError("Error fetching contacts. Please try again.");
      console.error("Error in fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/contact/deleteContact/${id}`
      );
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact._id !== id)
      );
      toast.success("Contact deleted successfully!");
    } catch (err) {
      console.error("Error deleting contact:", err);
      setError("Failed to delete contact. Please try again.");
    }
  };

  // Render loading, error, or contacts
  if (loading) {
    return <div>Loading contacts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (contacts.length === 0) {
    return <div>No contacts found.</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Contacts List
      </h1>
      <ul className="space-y-4">
        {contacts.map((contact) => (
          <li
            key={contact._id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex justify-between">
              <div>
                <div>
                  <strong className="text-gray-800">Name:</strong>{" "}
                  <span className="text-gray-600">{contact.name}</span>
                </div>
                <div>
                  <strong className="text-gray-800">Email:</strong>{" "}
                  <span className="text-gray-600">{contact.email}</span>
                </div>
                <div>
                  <strong className="text-gray-800">Message:</strong>{" "}
                  <span className="text-gray-600">{contact.message}</span>
                </div>
                <div>
                  <strong className="text-gray-800">Purpose:</strong>{" "}
                  <span className="text-gray-600">{contact.purpose}</span>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(contact._id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactPage;
