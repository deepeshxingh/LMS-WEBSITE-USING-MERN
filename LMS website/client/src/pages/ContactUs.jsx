import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MapPinHouseIcon,
  Phone,
  PhoneCall,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "sonner";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    purpose: "Course Enquiry",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getSelectedCategory = (value) => {
    setFormData((prev) => ({ ...prev, purpose: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/contact/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Sent Message Successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          purpose: "Course Enquiry",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div>
      <div className="bg-gray-200 pt-14 flex justify-center items-center min-h-screen gap-20">
        <div className=" w-[350px] bg-white px-4 py-3 text-black h-[500px]">
          <div className="flex text-blue-600 font-semibold">
            <span className="pt-1">
              <MapPin size={17} />
            </span>
            <h1 className="text-lg ml-2">Our Address</h1>
          </div>
          <h1 className="text-base font-serif">
            New Baneshwor , Kathmandu , Bagmati , Nepal
          </h1>

          <div className="flex mt-3 text-blue-600 font-semibold">
            <span className="pt-2">
              <PhoneCall size={17} />
            </span>
            <h1 className="text-lg ml-2">Our Contact</h1>
          </div>

          <div className="flex gap-10 text-base mt-2 ">
            <div>
              <h1>Mobile</h1>
              <h1>9800868011</h1>
              <h1>9706025055</h1>
            </div>

            <div>
              <h1>Landline</h1>
              <h1>041-560222</h1>
            </div>
          </div>

          <div className="flex mt-4 text-blue-600 font-semibold">
            <span className="pt-1">
              <Clock size={17} />
            </span>
            <h1 className="text-lg ml-2">Our Service Time</h1>
          </div>

          <div className="flex gap-10 text-base ">
            <div>
              <h1>MON-FRI</h1>
              <h1>10 am - 4 pm</h1>
            </div>

            <div>
              <h1>SAT-SUN</h1>
              <h1>Closed</h1>
            </div>
          </div>

          <h1 className="text-md mt-14 text-blue-600 font-semibold">
            Fet in Touch in Social Network
          </h1>

          <div className="flex ml-14 mt-9 gap-5 text-blue-600 font-semibold">
            <NavLink
              to="https://www.facebook.com/dipeshkumar.mahato.100046?mibextid=ZbWKwL"
              target="_blank"
            >
              <div>
                <Facebook size={32} />
              </div>
            </NavLink>

            <NavLink
              to="https://www.instagram.com/dipesh.xingh/profilecard/?igsh=NHQzMm16bHppYTli"
              target="_blank"
            >
              <div>
                <Instagram size={32} />
              </div>
            </NavLink>

            <NavLink
              to="https://www.tiktok.com/@deepeshxingh1?_t=8sb9kwSTkJT&_r=1"
              target="_blank"
            >
              <div>
                <Linkedin size={32} />
              </div>
            </NavLink>
          </div>
        </div>

        <Card>
          <div className="max-w-7xl mx-auto py-10 px-10 bg-white w-[500px] h-[500px]">
            <h1 className="text-3xl text-gray-800 font-semibold text-center">
              Contact Us
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
              <div>
                <Label>Name: </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter Your Name"
                  className="w-full"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Email: </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Message: </Label>
                <Textarea
                  type="text"
                  name="message"
                  id="message"
                  required
                  placeholder="Enter Your Message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4 mb-5">
                <Label>Purpose</Label>
                <Select
                  onValueChange={getSelectedCategory}
                  value={formData.purpose}
                >
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Select the purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Purpose</SelectLabel>
                      <SelectItem value="Course Enquiry">
                        Course Enquiry
                      </SelectItem>
                      <SelectItem value="Technical Support">
                        Technical Support
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" className="text-center">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
      <div className="flex items-center justify-center bg-gray-200">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50307.62990323121!2d85.92502136924432!3d26.899315888439116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1740635504815!5m2!1sen!2snp" width="80%" height="700px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}

export default ContactUs;
