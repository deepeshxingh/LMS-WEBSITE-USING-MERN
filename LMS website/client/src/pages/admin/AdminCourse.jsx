import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteCourse } from "@/redux/courseSlice";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
 // Make sure Button component is correctly imported

function AdminCourse() {
  const dispatch = useDispatch(); // Ensure dispatch is correctly imported
  const {course} = useSelector(store => store.course); // Ensure course is an array

  const deleteCourseHandler = async(courseId)=>{
    try {
     const res = await axios.delete(`http://localhost:8000/api/courses/${courseId}`, {
        withCredentials: true,
      });
      if(res.data.success){
        dispatch(deleteCourse(courseId));
        toast.success(res.data.message || "Course Deleted Successfully")
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete course")
    }
  }

  console.log(course)

  return (
    <div className="pt-5 px-10">
      <Table className="">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Course</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Creator</TableHead>
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
              <TableCell className="text-center flex justify-center items-center">
                {course.creator.name}
                <img className="h-10 w-10 rounded-[50%]" src={course.creator.photoUrl} alt="" />
              </TableCell>
              <TableCell className="text-right">
                {" "}
                <Button
                  variant="ghost"
                  onClick={() => deleteCourseHandler(course._id)}
                >
                  <Trash2 />
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminCourse;
