import { Button } from "@/components/ui/button";
import userImage from "../assets/images/user.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    name: user?.name || "",
    description: user?.description || "",
    file: null, // Ensure file is null initially
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const changefileHandler = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);

    // Ensure file is only appended if it exists
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8000/api/user/profile/update", {
        method: "PUT",
        body: formData,
        credentials: "include", // Important for cookies
      });

      const data = await response.json();

      if (response.ok) {
        setOpen(false)
        toast.success("Profile updated successfully!");
        dispatch(setUser(data.user));
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 bg-gray-100 py-12 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r bg-white shadow-xl rounded-2xl mt-14 ">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12 ">
          {/* Profile Picture  */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={user?.photoUrl || userImage}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Details  */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-500">
              Welcome, {user?.name?.split(" ")[0] || "User"}
            </h1>

            <p className="text-lg text-gray-600 mt-3">
              <span className="font-bold">Email: </span>
              {user?.email || "Email not available"}
            </p>

            <p className="text-gray-600 my-1 capitalize">
              <span className="font-bold">Role: </span>
              {user?.role || "User"}
            </p>

            <p className="text-gray-700 text-base leading-relaxed mb-3">
              <span className="font-bold">Bio: </span>
              {user?.description || "Add your bio"}
            </p>

            {/* Edit Profile Dialog */}
            <Dialog open={open} onOpenChange={setOpen} >
              
                <Button onClick={()=>setOpen(true)} className="bg-blue-500">Edit Profile</Button>
              

              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-center">Edit Profile</DialogTitle>
                  <DialogDescription className="text-center">
                    Make changes to your profile
                  </DialogDescription>
                </DialogHeader>

                {/* Edit Form */}
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={input.name}
                      onChange={changeEventHandler}
                      className="col-span-3 text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      value={input.description}
                      onChange={changeEventHandler}
                      className="col-span-3 text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image
                    </Label>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={changefileHandler}
                      className="w-[255px]"
                    />
                  </div>
                </div>

                <DialogFooter>
                  {loading ? (
                    <Button disabled className="bg-blue-400">
                      <Loader className="mr-2 w-4 h-4 animate-spin" /> Please Wait
                    </Button>
                  ) : (
                    <Button onClick={submitHandler} className="bg-blue-500">
                      Save Changes
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
