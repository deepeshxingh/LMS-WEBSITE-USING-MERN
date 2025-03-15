import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Instructor from "./pages/instructor/Instructor";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/instructor/Dashboard";
import Course from "./pages/instructor/Course";
import CreateCourses from "./pages/instructor/CreateCourses";
import UpdateCourse from "./pages/instructor/UpdateCourse";
import Lecture from "./pages/instructor/Lecture";
import EditLecture from "./pages/instructor/EditLecture";
import CourseDetail from "./pages/CourseDetail";
import ContactUs from "./pages/ContactUs";
// import TestimonialPage from "./pages/TestimonialList";
import AboutUs from "./pages/AboutUs";
import { useSelector } from "react-redux";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import AdminCourse from "./pages/admin/AdminCourse";
import AdminUser from "./pages/admin/AdminUser";
import ContactPage from "./pages/admin/ContactPage";
import Blog from "./pages/admin/Blog";
import BlogList from "./pages/BlogList";
import BlogDetails from "./pages/BlogDetails";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element : <><Navbar /> <Home /> </>
  },
  {
    path: "/courses",
    element: <> <Navbar /> <Courses /> </>
  },
  {
    path: "/login",
    element: <> <Navbar /> <Login /> </>
  },
  {
    path: "/signup",
    element: <> <Navbar /> <SignUp /> </>
  },
  {
    path: "/blog",
    element: <> <Navbar /> <BlogList /> </>
  },
  {
    path: "/blog/:id",
    element: <> <Navbar /> <BlogDetails /> </>
  },
  {
    path: "/profile",
    element: <><Navbar /> <Profile /></>
  },
  {
    path: "/payment",
    element: <><Navbar /> <Payment /></>
  },
  {
    path: "/success",
    element: <><Navbar /> <Success /></>
  },
  {
    path:"/instructor",
    element: <><Navbar /> <Instructor /> </>,
    children:[
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "course",
        element: <Course />
      },
      {
        path: "course/create",
        element: <CreateCourses />
      },
      {
        path: "course/:courseId",
        element: <UpdateCourse />
      },
      {
        path: "course/:courseId/lecture",
        element: <Lecture />
      },
      {
        path: "course/:courseId/lecture/:lectureId",
        element: <EditLecture />
      }
    ]
  },
  {
    path : "admin",
    element: <><Navbar /> <Admin /> </>,
    children:[
      {
        path: "dashboard",
        element: <AdminDashBoard />
      },
      {
        path: "course",
        element: <AdminCourse />
      },
      {
        path : "user",
        element : <AdminUser />
      },
      {
        path : "message",
        element : <ContactPage />
      },
      {
        path : "blog",
        element : <> <Blog /></>
      }
    ]
  },
  {
    path: "/courses/:courseId",
    element: <><Navbar /> <CourseDetail /></>
  },
  {
    path: "/contactUs",
    element: <><Navbar /> <ContactUs /></>
  },
  {
    path: "/testimonials",
    // element: <><Navbar /> <TestimonialPage /></>
  },
  {
    path: "/aboutUs",
    element: <><Navbar /> <AboutUs /></>
  },
])


function App(){
  const {user} = useSelector(store=>store.auth)
  return(
  <div>
   <RouterProvider router={router} />
   <Footer />

  </div>
)}


export default App;
