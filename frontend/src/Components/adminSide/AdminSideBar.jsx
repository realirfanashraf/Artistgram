import { Link } from 'react-router-dom';

const AdminSideBar = () => {
  return (
    <div className="bg-primary h-screen w-52">
      <div className="flex flex-col justify-between h-full">
        <div className="mb-2">
          <Link to='/admin/dashboard' className='navLinks block mb-2'>Dashboard</Link>
          <Link to='/admin/userManagement' className='navLinks block mb-2'>User Management</Link>
          <Link to='/admin/postManagement' className='navLinks block mb-2'>Post Management</Link>
          <Link to='/admin/eventManagement' className='navLinks block mb-2'>Event Management</Link>
          <Link to='/admin/adminProfile' className='navLinks block mb-2'>Profile</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSideBar