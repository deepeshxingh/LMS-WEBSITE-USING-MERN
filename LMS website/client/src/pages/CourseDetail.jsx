import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Lock, PlayCircle } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Separator } from "@/components/ui/separator";

function CourseDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const { course } = useSelector((store) => store.course);
  const selectedCourse = course.find((course) => course._id === courseId);
  const [courseLecture, setCourseLecture] = useState(null);

  useEffect(() => {
    const getCourseLecture = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/courses/${courseId}/lecture`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setCourseLecture(res.data.lectures);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCourseLecture();
  });
  return (
    <div className="bg-gray-100 md:p-10">
      <Card className="max-w-7xl rounded-md mx-auto bg-white shadow-md pt-5 mt-14">
        {/* Header Section  */}
        <div className="px-4 py-1">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => navigate("/courses")}
              >
                <ArrowLeft size={16} />
              </Button>
              <h1 className="md:text-2xl font-bold text-gray-800">
                {selectedCourse.courseTitle}
              </h1>
            </div>
            <div className="flex space-x-4">
              <NavLink to="/payment" state={{course_title : selectedCourse.courseTitle , total_amount : selectedCourse.coursePrice}} className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600">
                Enroll Now
              </NavLink>
            </div>
          </div>
        </div>
        {/* Course Overview Section  */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <img
              src={selectedCourse.courseThumbnail}
              alt="Course Picture"
              className="w-full lg:w-1/3 rounded-md  mb-4 lg:mb-0"
            />
            <div>
              <p className="text-gray-800 mb-4 font-semibold capitalize">
                {selectedCourse.subTitle}
              </p>
              <p className="mb-4 text-gray-700">{selectedCourse.description}</p>
              <p className="text-gray-800 font-semibold">
                ⭐⭐⭐⭐⭐ (4.8) | 1,200 reviews{" "}
              </p>
              <div className="mt-1">
                <p className="text-2xl font-bold text-gray-800 ">
                  Nrs. {selectedCourse.coursePrice}
                </p>
                <p className="text-gray-500 line-through">{selectedCourse.coursePrice + 5000}</p>
              </div>
              <div>
                <p className="text-gray-600">✔ 30+ hours of video content</p>
                <p className="text-gray-600">
                  ✔ Lifetime access to course material
                </p>
                <p className="text-gray-600">✔ Certification of completion</p>
              </div>
            </div>
          </div>
        </div>
        <div className="  p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            What You'll Learn
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>{selectedCourse.subTitle}</li>
            <li>Using Modern technologies with projects</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Requirements
          </h2>
          <p className="text-gray-700">
            Basic programming knowledge is helpful but not required.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Who This Course is For
          </h2>
          <p className="text-gray-700">
            Beginners, aspiring developers, and professionals looking to upgrade
            skills.
          </p>
        </div>
        {/* Course Lecture Section  */}
        {courseLecture?.length == 0 ? null : (
          <div className="flex flex-col md:flex-row justify-between gap-10 p-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">
                Course Curriculum
              </h2>
              <p className="text-gray-700 italic my-2">
                {courseLecture?.length} Lectures
              </p>
              <div className="space-y-4">
                {courseLecture?.map((lecture, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-gray-200 p-4 rounded-md cursor-pointer"
                    >
                      <span>
                        {lecture.isPreviewFree ? (
                          <PlayCircle size={20} />
                        ) : (
                          <Lock size={20} />
                        )}
                      </span>
                      <p>{lecture.lectureTitle}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <Card>
                <CardContent className="p-4 flex flex-col">
                  <div className="w-full aspect-video mb-4">
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={courseLecture ? courseLecture[0]?.videoUrl : null}
                      controls={true}
                    />
                  </div>
                  <h1>
                    {courseLecture
                      ? courseLecture[0]?.lectureTitle
                      : "Lecture Title"}
                  </h1>
                  <Separator className="my-2" />
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Praesentium ullam ab quia dolores tempore. Atque.
                  </p>
                </CardContent>
                <CardFooter className="flex p-4">
                  <Button>Continue Course</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {/* Instructor Section  */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Instructor</h2>
          <div className="flex items-center space-x-4">
            <img
              src={selectedCourse.creator.photoUrl}
              alt="Instructor"
              className="w-16 h-16 rounded-full "
            />
            <div>
              <h1 className="text-lg font-bold text-gray-800">
                {selectedCourse.creator.name}
              </h1>
              <p className="text-gray-600"> Junior MERN Stack Developer</p>
            </div>
          </div>
          <p className="text-gray-700 mt-4">
            {selectedCourse.creator.description}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default CourseDetail;
