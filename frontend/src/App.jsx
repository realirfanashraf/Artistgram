import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticated, selectIsAuthenticated } from './redux/slices/userSlices/authSlice.js';
import { setAdminAuthenticated, selectIsAdminAuthenticated } from './redux/slices/adminSlices/adminAuthSlice.js';
import UserRoutes from './routes/UserRoutes.jsx';
import AdminRoutes from './routes/AdminRoutes.jsx';
import { checkJWTToken } from './helper/checkJwtToken.js';
import { checkAdminJWTToken } from './helper/checkAdminJWTToken.js';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <UserRoutes isAuthenticated={isAuthenticated} />
      <AdminRoutes isAdminAuthenticated={isAdminAuthenticated} />
    </>
  );
}

export default App;
