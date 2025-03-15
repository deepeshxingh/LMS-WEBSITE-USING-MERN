
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

function Instructor (){
  return(
    <div className="bg-gray-200 flex pt-16">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  )
}

export default Instructor;