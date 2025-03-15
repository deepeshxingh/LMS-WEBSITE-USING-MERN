import CourseCard from "@/components/CourseCard";
import { setCourse } from "@/redux/courseSlice";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Courses() {
  const [query, setQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);

  useEffect(() => {
    const getAllPublishedCourses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/courses/published-courses`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setCourse(res.data.courses));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllPublishedCourses();
  }, [dispatch]);

  let filteredCourse = course.filter((c) =>
    [c.courseTitle, c.category, c.courseLevel].some((field) =>
      field?.toLowerCase().includes(query.toLowerCase())
    )
  );

  if (selectedLevel) {
    filteredCourse = filteredCourse.filter((c) => c.courseLevel === selectedLevel);
  }

  if (minPrice !== "" || maxPrice !== "") {
    filteredCourse = filteredCourse.filter((c) => {
      const coursePrice = c.coursePrice || 0;
      return (
        (minPrice === "" || coursePrice >= Number(minPrice)) &&
        (maxPrice === "" || coursePrice <= Number(maxPrice))
      );
    });
  }

  if (sortOption === "popularity") {
    filteredCourse.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
  } else if (sortOption === "newest") {
    filteredCourse.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOption === "priceLowHigh") {
    filteredCourse.sort((a, b) => a.coursePrice - b.coursePrice);
  } else if (sortOption === "priceHighLow") {
    filteredCourse.sort((a, b) => b.coursePrice - a.coursePrice);
  }

  return (
    <div className="bg-[#1e2d52] text-[#e2e8f0] pt-14">
      <div className="min-h-screen max-w-7xl mx-auto py-10">
        <div className="px-4">
          <h1 className="text-center text-5xl font-extrabold text-[#22d3ee] mb-4">
            Explore Our Courses 🚀
          </h1>
          <p className="text-center text-[#94a3b8] mb-6">
            Learn with cutting-edge courses & expert guidance.
          </p>

          {/* SEARCH & FILTER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-[450px]">
              <input
                type="text"
                placeholder="Search by Title, Category, or Level..."
                className="bg-[#1e293b] w-full text-[#e2e8f0] p-4 rounded-lg shadow-md border border-[#22d3ee] focus:ring-2 focus:ring-[#e879f9]"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="px-4 py-2 bg-[#22d3ee] font-semibold text-[#0f172a] rounded-lg ml-2 absolute right-2 top-2 hover:bg-[#e879f9]">
                <Search width={20} height={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* COURSE LEVEL FILTER */}
              <select
                className="p-3 bg-[#1e293b] border border-[#22d3ee] rounded-lg text-[#e2e8f0] shadow-sm"
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advance">Advanced</option>
              </select>

              {/* PRICE FILTER */}
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  className="p-3 w-24 bg-[#1e293b] border border-[#22d3ee] rounded-lg text-[#e2e8f0] shadow-sm"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  className="p-3 w-24 bg-[#1e293b] border border-[#22d3ee] rounded-lg text-[#e2e8f0] shadow-sm"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              {/* SORT OPTIONS */}
              <select
                className="p-3 bg-[#1e293b] border border-[#22d3ee] rounded-lg text-[#e2e8f0] shadow-sm"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="popularity">Popularity</option>
                <option value="newest">Newest First</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* COURSE LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourse.length > 0 ? (
              filteredCourse.map((course) => (
                <div
                  key={course._id}
                  className="transition-transform transform hover:-translate-y-2 duration-300 hover:shadow-[0_0_15px_#22d3ee]"
                >
                  <CourseCard course={course} />
                </div>
              ))
            ) : (
              <p className="text-center text-[#94a3b8] col-span-3">No courses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
