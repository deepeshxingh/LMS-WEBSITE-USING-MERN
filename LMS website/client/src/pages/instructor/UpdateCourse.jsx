import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

function UpdateCourse() {
  return (
    <div className="md:p-10 p-4">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl ">
          Add detailed information Regarding Course
        </h1>
        <Link to="lecture">
          <Button className="hover:text-blue-600">Go to Lecture Page</Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
}

export default UpdateCourse;
