import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkJWTToken, checkAdminJWTToken } from '../../helper/checkJwtToken';


export const AuthRoute = ({ component: Component ,isAuthenticated }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   console.log('authrout');
  //   const fetchData = async () => {
  //     const isAuthenticated = await checkJWTToken();
  //     setIsAuthenticated(isAuthenticated);
  //   };

  //   fetchData();
  // }, []);
console.log(isAuthenticated,"authrote")
  return isAuthenticated ? <Navigate to="/home" replace /> : <Component />;
};

export const PrivateRoute = ({ component: Component,isAuthenticated }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   console.log('privateroute');
  //   const fetchData = async () => {
  //     const isAuthenticated = await checkJWTToken();
  //     setIsAuthenticated(isAuthenticated);
  //   };

  //   fetchData();
  // }, []);
  console.log(isAuthenticated,"privaterote")

  return isAuthenticated ? <Component /> : <Navigate to="/signin" replace />;
};

export const AdminAuthRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("admin auth")
    const isAuthenticated = checkAdminJWTToken();
    setIsAuthenticated(isAuthenticated);
  }, []);

  return isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Component />;
};

export const AdminPrivateRoute = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('ygugyugugu');
    const isAuthenticated = checkAdminJWTToken();
    setIsAuthenticated(isAuthenticated);
  }, []);

  return isAuthenticated ? <Component /> : <Navigate to="/admin" replace />;
};
