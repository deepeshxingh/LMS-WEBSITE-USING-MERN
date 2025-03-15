import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setCourse } from "@/redux/courseSlice";
import axios from "axios";
import { Edit } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Course() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  useEffect(() => {
    const getCreatorCourse = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/courses/", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCreatorCourse();
  });
  return (
    <div className="md:p-10 p-4 w-full h-screen overflow-scroll">
      <Button className="bg-blue-500" onClick={() => navigate("create")}>
        Create Course
      </Button>
      <Table className="mt-10">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Course</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="md:w-[400px] flex items-center gap-2">
                <img src={course?.courseThumbnail} alt="Thumbnail" className="w-20 hidden md:block rounded-sm " />
                {course.courseTitle}
              </TableCell>

              <TableCell className="font-medium text-right">
                {course.coursePrice || "N/A"}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={course.isPublished ? "bg-green-400" : "bg-red-400"}
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {" "}
                <Button
                  variant="ghost"
                  onClick={() => navigate(`/instructor/course/${course._id}`)}
                >
                  <Edit />
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Course;
