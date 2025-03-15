import Hero from "@/components/Hero";
import CourseCard from "@/components/courseCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import Testimonials from "./TestimonialList";



function Home(){
  const {course} = useSelector(store => store.course)
  
  return(
    <div>
      <Hero />
      <div>
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-4 mt-4">Featured Courses</h1>
        <p className="text-center text-gray-600 mb-6">Discover the best courses in the industry.</p>
        
      </div>
        <div  className=" max-w-7xl mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {
          course.slice(0,6).map((course,index)=>{
            return <CourseCard key={index} course={course} />
          })
        }
        </div>
        <div className="flex justify-center items-center mt-8 mb-5">
          <Link to="/courses">
          <button className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View All Courses
          </button>
          </Link>
        </div>

        {/* <Testimonials /> */}
    </div>
  )
}

export default Home;