import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setLecture } from "@/redux/lectureSlice";
import axios from "axios";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

function Lecture() {
  const params = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [lectureTitle, setLectureTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const {lecture} = useSelector(store => store.lecture)

  const createLectureHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/courses/${params?.courseId}/lecture`,
        { lectureTitle },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setLectureTitle("");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const getLectures = async()=>{
      try {
        const res = await axios.get(`http://localhost:8000/api/courses/${params.courseId}/lecture`, {withCredentials: true});
        if(res.data.success){
          dispatch(setLecture(res.data.lectures))
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to get lectures")
      }
    }
    getLectures()
  },[lecture])
  return (
    <div className="p-4 md:p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold mb-2">
        Lets add <span className="text-blue-600">Lectures</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
        quod!
      </p>
      <div className="mt-10 space-y-5">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Your lecture name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={()=>navigate(`/instructor/course`)} variant="outline">Back to course</Button>
          <Button
            onClick={createLectureHandler}
            className="bg-gray-800 hover:bg-gray-700"
          >
            {
              loading ? <><Loader2 className="mr-1 h-4 w-4 animate-spin" /> Please wait...</> :  "Create Lecture"
            }
          </Button>
        </div>
      </div>

      <div className="mt-10">
        {
            lecture?.map((lecture,index)=>{
              return <div key={index} className="flex items-center justify-between bg-[#F7F9FA] px-4 py-2 rounded-md my-2">
                <h1 className="font-bold text-gray-800">Lecture - {index+1}: {lecture.lectureTitle}</h1>
                <Edit size={20} onClick={()=>navigate(`${lecture._id}`)} className="cursor-pointer text-gray-600 hover:to-blue-600" />
              </div>
            })
        }
      </div>
    </div>
  );
}

export default Lecture;
