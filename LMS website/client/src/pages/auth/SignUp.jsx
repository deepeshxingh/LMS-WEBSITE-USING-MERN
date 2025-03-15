import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name,email,password,role);
    // API call to create user
    try {
      let response = await fetch("http://localhost:8000/api/user/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      if (response.ok) {
        response = await response.json();
        console.log(response);
        toast.success(response.message);
        setName("");
        setEmail("");
        setPassword("");
        setRole("student");
        navigate("/login");
      } else {
        response = await response.json();
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-center text-gray-800 text-2xl font-bold mb-4">
          Create your Account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us today ! It's quick and easy
        </p>
        {/* Name Input  */}
        <div className="mb-3">
          <Label>Full Name</Label>
          <Input
            placeholder="Enter your full name"
            required
            type="text"
            name="name"
            value={name}
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <Label>Email Address</Label>
          <Input
            placeholder="Enter your email address"
            required
            type="email"
            name="email"
            value={email}
            id="email"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
        </div>

        <div className="mb-3">
          <Label>Password</Label>
          <Input
            placeholder="Enter your password"
            required
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
        </div>

        <div className="mb-3">
          <Label>Role</Label>
          <RadioGroup className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                id="student"
                checked={role === "student"}
                onChange={(e)=>{
                  setRole(e.target.value)
                }}
              />
              <Label htmlFor="student">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="instructor"
                id="instructor"
                checked={role === "instructor"}
                onChange={(e)=>{
                  setRole(e.target.value)
                }}
              />
              <Label htmlFor="instructor"> Instructor</Label>
            </div>
          </RadioGroup>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md w-full "
        >
          SignUp
        </button>
        <p className="text-center mt-3">
          {" "}
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default SignUp;
