import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/adminPages/authPages/Login';
import Dashboard from '../Pages/adminPages/Dashboard';
import UserManagement from '../Pages/adminPages/management/UserManagement';
import PostManagement from '../Pages/adminPages/management/PostManagement';
import EventManagement from '../Pages/adminPages/management/EventManagement';
import AdminProfile from '../Pages/adminPages/AdminProfile';
import { AdminAuthRoute, AdminPrivateRoute } from '../Components/userSide/RouteHandler';

function AdminRoutes({ isAdminAuthenticated }) {
  return (
    <Routes>
      <Route path="/admin" element={<AdminAuthRoute component={Login} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/dashboard" element={<AdminPrivateRoute component={Dashboard} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/userManagement" element={<AdminPrivateRoute component={UserManagement} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/postManagement" element={<AdminPrivateRoute component={PostManagement} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/eventManagement" element={<AdminPrivateRoute component={EventManagement} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/adminProfile" element={<AdminPrivateRoute component={AdminProfile} isAdminAuthenticated={isAdminAuthenticated} />} />
    </Routes>
  );
}

export default AdminRoutes;
