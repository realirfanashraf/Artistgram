import { Routes, Route } from 'react-router-dom';
import SignUp from '../Pages/userPages/authPages/SignUp';
import Home from '../Pages/userPages/Home';
import SignIn from '../Pages/userPages/authPages/SignIn';
import Intro from '../Pages/userPages/Intro';
import ForgotPassword from '../Pages/userPages/authPages/ForgotPassword';
import Profile from '../Pages/userPages/Profile';
import Inbox from '../Pages/userPages/Inbox';
import Event from '../Pages/userPages/Event';
import { AuthRoute, PrivateRoute } from '../Components/userSide/RouteHandler';

function UserRoutes({ isAuthenticated }) {
  return (
    <Routes>
      <Route path="/" element={<AuthRoute component={Intro} isAuthenticated={isAuthenticated} />} />
      <Route path="/signin" element={<AuthRoute component={SignIn} isAuthenticated={isAuthenticated} />} />
      <Route path="/signup" element={<AuthRoute component={SignUp} isAuthenticated={isAuthenticated} />} />
      <Route path="/forgotPassword" element={<AuthRoute component={ForgotPassword} isAuthenticated={isAuthenticated} />} />
      <Route path="/home" element={<PrivateRoute component={Home} isAuthenticated={isAuthenticated} />} />
      <Route path="/profile" element={<PrivateRoute component={Profile} isAuthenticated={isAuthenticated} />} />
      <Route path="/inbox" element={<PrivateRoute component={Inbox} isAuthenticated={isAuthenticated} />} />
      <Route path="/event" element={<PrivateRoute component={Event} isAuthenticated={isAuthenticated} />} />
    </Routes>
  );
}

export default UserRoutes;
