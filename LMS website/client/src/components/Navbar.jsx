import { BrainCircuit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import userImage from "../assets/images/user.png"

function Navbar() {
  const dispatch = useDispatch()
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  // const user = false;

  const logoutHandler = async()=>{
    try {
      const response = await fetch("http://localhost:8000/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Parse the response correctly
      const data = await response.json();
      
      if (data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("Logged out successfully");
      } 
       
    } catch (error) {
      console.log(error)
      toast.error("Failed to logout. Please try again")
    }
  }
  return (
    <div className="bg-gray-900 z-50 w-full fixed top-0 py-3">
      <div className="max-w-7xl flex mx-auto justify-between">
        {/* Logo Section  */}
        <Link to="/">
        <div className="flex gap-2">
          <BrainCircuit className="text-gray-300 w-10 h-10" />
          <h1 className="text-gray-300 text-3xl font-bold">E-Learning</h1>
        </div></Link>
        {/* Menu Section  */}
        <nav>
          <ul className="flex gap-7 item-center font-semibold text-white"> 
            <Link to="/" ><li className="mt-2">Home</li></Link>
            <Link to="/courses"><li className="mt-2">Courses</li></Link>
            <Link to="/aboutUs"><li className="mt-2">About Us</li></Link>
            <Link to="/contactUs"><li className="mt-2">Contact Us</li></Link>
            {/* <Link to="/testimonials"><li className="mt-2">Testimonials</li></Link> */}
            <Link to="/blog"><li className="mt-2">Blog</li></Link>
            {!user ? (
              <div className="flex gap-3">
                <Link to="/login"><button className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md ">Login</button></Link>
                <Link to="/signup"><button className="bg-gray-700 hover:bg-gray-900  px-4 py-2 rounded-md ">Signup</button></Link>
              </div>
            ) : (
              <div className="flex items-center gap-7">
                {
                  user.role==="instructor" && <Link to="/instructor/dashboard"><li className="cursor-pointer">Dashboard</li></Link>
                }
                {
                  user.role==="admin" && <Link to="/admin/dashboard"><li>Dashboard</li></Link>
                }
                <Link to="/profile">
                <Avatar>
                  <AvatarImage src={user?.photoUrl || userImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </Link>
                <button onClick={logoutHandler} className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md" >Logout</button>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
