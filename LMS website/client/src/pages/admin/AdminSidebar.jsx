import { BookOpen, ChartColumnBig, FolderPlus, MessageCircleQuestion, MessageSquare, UserCircle2 } from "lucide-react";
import { FaBloggerB } from "react-icons/fa";

import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="bg-gray-700 w-72 h-screen hidden md:block sticky top-0">
      <div className="text-center pt-10 px-3 space-y-2 ">
        <NavLink to="/admin/dashboard" className={({isActive})=>`text-2xl text-gray-300 ${isActive ? `bg-gray-950`: `bg-transparent`} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <ChartColumnBig />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/course" className={({isActive})=>`text-2xl text-gray-300 ${isActive ? `bg-gray-950`: `bg-transparent`} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <BookOpen />
          <span>Course</span>
        </NavLink>

        <NavLink to="/admin/user" className={({isActive})=>`text-2xl text-gray-300 ${isActive ? `bg-gray-950`: `bg-transparent`} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <UserCircle2 />
          <span>User</span>
        </NavLink>

        <NavLink to="/admin/message" className={({isActive})=>`text-2xl text-gray-300 ${isActive ? `bg-gray-950`: `bg-transparent`} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <MessageCircleQuestion />
          <span>Messages</span>
        </NavLink>
        <NavLink to="/admin/blog" className={({isActive})=>`text-2xl text-gray-300 ${isActive ? `bg-gray-950`: `bg-transparent`} flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full`}>
          <FaBloggerB />
          <span>Blogs</span>
        </NavLink>


      </div>
    </div>
  );
}

export default AdminSidebar;
