
import { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, selectIsAuthenticated } from './redux/slices/userSlices/authSlice.js';
import SignUp from './Pages/userPages/authPages/SignUp';
import Home from './Pages/userPages/Home';
import SignIn from './Pages/userPages/authPages/SignIn';
import Login from './Pages/adminPages/authPages/Login';
import Dashboard from './Pages/adminPages/Dashboard';
import { PrivateRoute, AuthRoute, AdminAuthRoute, AdminPrivateRoute } from './Components/userSide/RouteHandler';
import { checkJWTToken, checkAdminJWTToken } from './helper/checkJwtToken';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIsAuthenticated = await checkJWTToken();
        const adminIsAuthenticated = await checkAdminJWTToken();
        dispatch(setAuthenticated(userIsAuthenticated || adminIsAuthenticated));
      } catch (error) {
        dispatch(setAuthenticated(false));
      }
    };

    fetchData();
  }, [dispatch]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>

            {/* user routes */}
      <Route path="/home" element={<PrivateRoute component={Home} isAuthenticated={isAuthenticated} />} />
      <Route path="/signin" element={<AuthRoute component={SignIn} isAuthenticated={isAuthenticated} />} />
      <Route path="/signup" element={<AuthRoute component={SignUp} isAuthenticated={isAuthenticated} />} />


          {/* admin routes */}
      <Route path="/admin" element={<AdminAuthRoute component={Login} />} />
      <Route path="/admin/dashboard" element={<AdminPrivateRoute component={Dashboard} />} />
    </Routes>
  );
}


export default App;
