import { Button } from "@/components/ui/button";
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
} from "@/components/ui/select"
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CreateCourses() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [courseTitle, setCourseTitle] = useState("")
  const [category, setCategory] = useState("")
  const getSelectedCategory =(value)=>{
    setCategory(value)
  }

  const createCourseHandler = async ()=>{
    try {
      setLoading(true)
      let res =await axios.post("http://localhost:8000/api/courses/",{courseTitle, category},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if(res.data.success){
        navigate("/instructor/course")
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error("failed to create course")
      
    } finally{
      setLoading(false)
    }
  }
  return (
    <div className="p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold">
        Let's Add <span className="text-blue-500">Courses</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis
        expedita ullam eum corrupti ipsa iure.
      </p>

      <div className="mt-10">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Your Course Name"
            className="bg-white"
            value={courseTitle}
            onChange={(e) => {
              setCourseTitle(e.target.value);
            }}
          />
        </div>

        <div className="mt-4 mb-5">
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="Web Development">Web Development</SelectItem>
          <SelectItem value="Web Design">Web Design</SelectItem>
          <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
          <SelectItem value="Data Science">Data Science</SelectItem>
          <SelectItem value="Cyber Security">Cyber Security</SelectItem>
          <SelectItem value="Mongo DB">Mongo DB</SelectItem>
          <SelectItem value="React JS">React JS</SelectItem>
          <SelectItem value="NODE JS">NODE JS</SelectItem>
          <SelectItem value="PYTHON Learning">PYTHON Learning</SelectItem>
          <SelectItem value="Java Learning">Java Learning</SelectItem>
          <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
          <SelectItem value="Machine Learning">Machine Learning</SelectItem>
          <SelectItem value="Flutter Development">Flutter Development</SelectItem>
          <SelectItem value="Kotlin Development">Kotlin Development</SelectItem>
          <SelectItem value="Office Packages">Office Packages</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={()=>navigate("/instructor/dashboard")} variant="outline" >Cancel</Button>
          <Button onClick={createCourseHandler} disabled={loading} className="bg-blue-500 hover:bg-blue-600">
            {
              loading ? <><Loader2 className="animate-spin mr-1 h-4 w-4" /> Please Wait...</> : "Create"
            } 
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCourses;
