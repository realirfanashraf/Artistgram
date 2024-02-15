import {  Navigate } from 'react-router-dom';
import { checkJWTToken } from '../../helper/checkJwtToken'

export const AuthRoute = ({ children}) => {
  const isAuthenticated = checkJWTToken();
  return isAuthenticated ? <Navigate to="/home" replace /> : children;
};