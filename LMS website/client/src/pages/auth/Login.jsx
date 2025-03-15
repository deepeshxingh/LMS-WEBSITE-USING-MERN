import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/redux/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Adding code here to handle the login functionality
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Adding code here to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    
    try {
      let response = await fetch("http://localhost:8000/api/user/loginUser", {
        method: "POST",
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      if(response.ok){
        response = await response.json();
        console.log(response);
        toast.success(response.message)
        setEmail("");
        setPassword("");
        navigate("/")
        dispatch(setUser(response.user))
      }
      else{
        response = await response.json();
        toast.error(response.message)
      }
      
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-center text-gray-800 text-2xl font-bold mb-4">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please Log in into your account
        </p>
        {/* Name Input  */}

        <div className="mb-3">
          <Label>Email Address</Label>
          <Input
            placeholder="Enter your email address"
            required
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value);
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
            id="password"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md w-full "
        >
          Login
        </button>
        <p className="text-center mt-3">
          {" "}
          Don't have an account ?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create New
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
