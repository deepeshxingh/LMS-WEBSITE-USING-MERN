import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function Admin(){
  return(
    <div className="bg-gray-200 flex pt-16">
      <AdminSidebar />
      <div className="flex-1">
        <Outlet />
      </div>

    </div>
  )
}

export default Admin;