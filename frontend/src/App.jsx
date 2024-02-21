import { Routes, Route } from 'react-router-dom';
import SignUp from './Pages/userPages/authPages/SignUp';
import Home from './Pages/userPages/Home';
import SignIn from './Pages/userPages/authPages/SignIn';
import { PrivateRoute, AuthRoute, AdminAuthRoute, AdminPrivateRoute } from './Components/userSide/RouteHandler';
import Login from './Pages/adminPages/authPages/Login';
import Dashboard from './Pages/adminPages/Dashboard';
import { useEffect, useState } from 'react';
import { checkJWTToken } from './helper/checkJwtToken';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAuthenticated = await checkJWTToken();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  // Render loading indicator while authentication status is being determined
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthenticated !== null && ( 
        <Routes>
          {/* User Routes */}
          <Route
            path='/home'
            element={<PrivateRoute component={Home} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/signin'
            element={<AuthRoute component={SignIn} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path='/signup'
            element={<AuthRoute component={SignUp} isAuthenticated={isAuthenticated} />}
          />

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminAuthRoute component={Login} />} />
          <Route path='/admin/dashboard' element={<AdminPrivateRoute component={Dashboard} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
