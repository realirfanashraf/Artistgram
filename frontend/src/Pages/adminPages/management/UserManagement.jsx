import AdminNavbar from "../../../Components/adminSide/AdminNavbar"
import AdminSideBar from "../../../Components/adminSide/AdminSideBar"
import UserManagementTable from "../../../Components/adminSide/UserManagementTable"

const UserManagement = () => {
  return (
    <>
  <AdminNavbar />
  
  <div className="flex flex-row">
    <div className="hidden md:block w-1/5">
      <AdminSideBar />
    </div>
    
    <div className="grow">
      <UserManagementTable />
    </div>
  </div>
</>

  )
}

export default UserManagement