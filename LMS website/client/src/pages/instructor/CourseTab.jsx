import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { setCourse } from "@/redux/courseSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function CourseTab() {
  const params = useParams();
  const id = params.courseId;
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {course} = useSelector(store => store.course)
  const selectCourse = course.find(course => course._id === id)

  const [selectedCourse, getSelectedCourse] = useState(selectCourse);
  const [loading, setLoading] = useState(false)
  const [publish,setPublish] = useState(false)

  const getCourseById = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/courses/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        getSelectedCourse(res.data.course);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseById();
  });

  const [input, setInput] = useState({
    courseTitle: selectedCourse?.courseTitle,
    subTitle: selectedCourse?.subTitle,
    description: selectedCourse?.description,
    category: selectedCourse?.category,
    coursePrice: selectedCourse?.coursePrice,
    courseLevel: selectedCourse?.courseLevel,
    file: "",
  });

  const [previewThumbnail, setPreviewThumbnail] = useState(
    selectedCourse?.courseThumbnail
  );

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectLevelCourse = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async ()=>{
    const formData = new FormData();
    formData.append("courseTitle",input.courseTitle)
    formData.append("subTitle",input.subTitle)
    formData.append("description",input.description)
    formData.append("category",input.category)
    formData.append("coursePrice",input.coursePrice)
    formData.append("courseLevel",input.courseLevel)
    formData.append("file",input.courseThumbnail)

    try {
      setLoading(true)
      const res = await axios.put(`http://localhost:8000/api/courses/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })

      if(res.data.success){
        toast.success(res.data.message)
        navigate(`lecture`)
        dispatch([...course, setCourse(res.data.course) ])
      }
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  const togglePublishUnpublish = async (action)=>{
    try {
      const res = await axios.patch(`http://localhost:8000/api/courses/${id}`,{
        params:{
          action
        },
        withCredentials: true,
      })

      if(res.data.success){
        setPublish(!publish)
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card>
      <CardHeader className="flex md:flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button onClick={()=>togglePublishUnpublish(selectedCourse.isPublished ? "false":"true")} className="bg-gray-800">{selectedCourse.isPublished ? "UnPublish":"Publish"}</Button>
          <Button variant="destructive">Remove Course </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              value={input.courseTitle}
              onChange={changeEventHandler}
              type="text"
              name="courseTitle"
              placeholder="Eg: MERN Stack Development"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={input.subTitle}
              onChange={changeEventHandler}
              type="text"
              name="subTitle"
              placeholder="Eg: Become a MERN Stack Developer from beginner to advance in 3 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={input.description}
              onChange={changeEventHandler}
              type="text"
              name="description"
            />
          </div>
          <div className="flex md:flex-row flex-wrap gap-1 items-center md:gap-5">
            <div>
              <Label>Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Web Development">
                      Web Development
                    </SelectItem>
                    <SelectItem value="Web Design">Web Design</SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Cyber Security">
                      Cyber Security
                    </SelectItem>
                    <SelectItem value="Mongo DB">Mongo DB</SelectItem>
                    <SelectItem value="React JS">React JS</SelectItem>
                    <SelectItem value="NODE JS">NODE JS</SelectItem>
                    <SelectItem value="PYTHON Learning">
                      PYTHON Learning
                    </SelectItem>
                    <SelectItem value="Java Learning">Java Learning</SelectItem>
                    <SelectItem value="Artificial Intelligence">
                      Artificial Intelligence
                    </SelectItem>
                    <SelectItem value="Machine Learning">
                      Machine Learning
                    </SelectItem>
                    <SelectItem value="Flutter Development">
                      Flutter Development
                    </SelectItem>
                    <SelectItem value="Kotlin Development">
                      Kotlin Development
                    </SelectItem>
                    <SelectItem value="Office Packages">
                      Office Packages
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectLevelCourse}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Meduim</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in NPR.</Label>
              <Input
                value={input.coursePrice}
                onChange={changeEventHandler}
                type="number"
                name="coursePrice"
                id="coursePrice"
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnbail</Label>
            <Input
              type="file"
              id="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail}
            />
            {
              previewThumbnail && (
                <img src={previewThumbnail} alt="Course Thumbnail" className="w-64 my-2 " />
              )
            }
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/instructor/course")}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={updateCourseHandler} disabled={loading} className="bg-gray-800">
              {
                loading? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait...</> : "Save"
              }
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseTab;
