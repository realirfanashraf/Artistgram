
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, selectIsAuthenticated } from './redux/slices/userSlices/authSlice.js';
import { setAdminAuthenticated, selectIsAdminAuthenticated } from './redux/slices/adminSlices/adminAuthSlice.js'
import SignUp from './Pages/userPages/authPages/SignUp';
import Home from './Pages/userPages/Home';
import SignIn from './Pages/userPages/authPages/SignIn';
import Login from './Pages/adminPages/authPages/Login';
import Dashboard from './Pages/adminPages/Dashboard';
import { PrivateRoute, AuthRoute, AdminAuthRoute, AdminPrivateRoute } from './Components/userSide/RouteHandler';
import { checkJWTToken } from './helper/checkJwtToken';
import { checkAdminJWTToken } from './helper/checkAdminJWTToken.js'
import Intro from './Pages/userPages/Intro.jsx';
import ForgotPassword from './Pages/userPages/authPages/ForgotPassword.jsx';
import Profile from './Pages/userPages/Profile.jsx';
import UserManagement from './Pages/adminPages/management/UserManagement.jsx';
import AdminProfile from './Pages/adminPages/AdminProfile.jsx';
import PostManagement from './Pages/adminPages/management/PostManagement.jsx';
import Inbox from './Pages/userPages/Inbox.jsx';


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIsAuthenticated = await checkJWTToken();
        dispatch(setAuthenticated(userIsAuthenticated));
      } catch (error) {
        dispatch(setAuthenticated(false));
      }

      try {
        const adminIsAuthenticated = await checkAdminJWTToken();
        dispatch(setAdminAuthenticated(adminIsAuthenticated));
      } catch (error) {
        dispatch(setAdminAuthenticated(false));
      }

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      const tokenCheck = async () => {
        try {
          const userIsAuthenticated = await checkJWTToken();
          dispatch(setAuthenticated(userIsAuthenticated));
        } catch (error) {
          dispatch(setAuthenticated(false));
        }

        try {
          const adminIsAuthenticated = await checkAdminJWTToken();
          dispatch(setAdminAuthenticated(adminIsAuthenticated));
        } catch (error) {
          dispatch(setAdminAuthenticated(false));
        }
      };

      tokenCheck();
    }
  }, [location.pathname, loading, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Routes>
      <Route path='/' element={<AuthRoute component={Intro} isAuthenticated={isAuthenticated} />} />
      <Route path="/signin" element={<AuthRoute component={SignIn} isAuthenticated={isAuthenticated} />} />
      <Route path="/signup" element={<AuthRoute component={SignUp} isAuthenticated={isAuthenticated} />} />
      <Route path='/forgotPassword' element={<AuthRoute component={ForgotPassword} isAuthenticated={isAuthenticated} />} />
      <Route path="/home" element={<PrivateRoute component={Home} isAuthenticated={isAuthenticated} />} />
      <Route path='/profile' element={<PrivateRoute component={Profile} isAuthenticated={isAuthenticated} />} />
      <Route path='/inbox' element={<PrivateRoute component={Inbox} isAuthenticated={isAuthenticated} />} />



      {/* admin routes */}
      <Route path="/admin" element={<AdminAuthRoute component={Login} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/dashboard" element={<AdminPrivateRoute component={Dashboard} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/userManagement" element={<AdminPrivateRoute component={UserManagement} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/postManagement" element={<AdminPrivateRoute component={PostManagement} isAdminAuthenticated={isAdminAuthenticated} />} />
      <Route path="/admin/adminProfile" element={<AdminPrivateRoute component={AdminProfile} isAdminAuthenticated={isAdminAuthenticated} />} />
    </Routes>
  );
}


export default App;
