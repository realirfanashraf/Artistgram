import { Routes, Route } from 'react-router-dom';
import { AdminAuthRoute, AdminPrivateRoute } from '../Components/userSide/RouteHandler';
import { adminRoutePaths } from '../config';
import Login from '../Pages/adminPages/authPages/Login';
import Dashboard from '../Pages/adminPages/Dashboard';
import UserManagement from '../Pages/adminPages/management/UserManagement';
import PostManagement from '../Pages/adminPages/management/PostManagement';
import EventManagement from '../Pages/adminPages/management/EventManagement';
import AdminProfile from '../Pages/adminPages/AdminProfile';

function AdminRoutes({ isAdminAuthenticated }) {
  return (
    <Routes>
      <Route
        path={adminRoutePaths.adminLogin}
        element={<AdminAuthRoute component={Login} isAdminAuthenticated={isAdminAuthenticated} />}
      />
      <Route
        path={adminRoutePaths.adminDashboard}
        element={<AdminPrivateRoute component={Dashboard} isAdminAuthenticated={isAdminAuthenticated} />}
      />
      <Route
        path={adminRoutePaths.userManagement}
        element={<AdminPrivateRoute component={UserManagement} isAdminAuthenticated={isAdminAuthenticated} />}
      />
      <Route
        path={adminRoutePaths.postManagement}
        element={<AdminPrivateRoute component={PostManagement} isAdminAuthenticated={isAdminAuthenticated} />}
      />
      <Route
        path={adminRoutePaths.eventManagement}
        element={<AdminPrivateRoute component={EventManagement} isAdminAuthenticated={isAdminAuthenticated} />}
      />
      <Route
        path={adminRoutePaths.adminProfile}
        element={<AdminPrivateRoute component={AdminProfile} isAdminAuthenticated={isAdminAuthenticated} />}
      />
    </Routes>
  );
}

export default AdminRoutes;
