import AdminNavbar from "../../../Components/adminSide/AdminNavbar"
import AdminSideBar from "../../../Components/adminSide/AdminSideBar"
import ReportManagementTable from "../../../Components/adminSide/ReportManagementTable"

const PostManagement = () => {
  return (
    <>
  <AdminNavbar />
  
  <div className="flex flex-row">
    <div className="hidden md:block w-1/5">
      <AdminSideBar />
    </div>
    
    <div className="flex-grow">
      <ReportManagementTable />
    </div>
  </div>
</>
  )
}

export default PostManagement