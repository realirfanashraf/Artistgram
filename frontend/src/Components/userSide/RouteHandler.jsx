import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/home" replace /> : <Component />;
};

export const PrivateRoute = ({ component: Component, isAuthenticated }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/signin" replace />;
};

export const AdminAuthRoute = ({ component: Component, isAdminAuthenticated }) => {
  return isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Component />;
};

export const AdminPrivateRoute = ({ component: Component, isAdminAuthenticated }) => {
  return isAdminAuthenticated ? <Component /> : <Navigate to="/admin" replace />;
};
