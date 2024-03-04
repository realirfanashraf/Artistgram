import MenuBar from "../../Components/adminSide/MenuBar";
import AdminNavbar from "./AdminNav";

const Dashboard = () => {
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col items-center justify-center my-8 sm:mx-28 mx-4">
        <div className="bg-thirdShade rounded-lg shadow-md p-6 relative">
          <div className="grid grid-cols-4 gap-4 h-screen">
            <MenuBar/>
            <div className="col-span-3 ml-4 rounded-lg bg-slate-600">
              <div className="mx-4 my-4">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
