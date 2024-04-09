import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoute, PrivateRoute } from '../Components/userSide/RouteHandler';
import { routePaths } from '../config';
import SignUp from '../Pages/userPages/authPages/SignUp';
import Home from '../Pages/userPages/Home';
import SignIn from '../Pages/userPages/authPages/SignIn';
import Intro from '../Pages/userPages/Intro';
import ForgotPassword from '../Pages/userPages/authPages/ForgotPassword';
import Profile from '../Pages/userPages/Profile';
import Inbox from '../Pages/userPages/Inbox';
import Event from '../Pages/userPages/Event';
import RemoteUserProfile from '../Pages/userPages/RemoteUserProfile';
import Success from '../Components/userSide/Success';

function UserRoutes({ isAuthenticated }) {
  return (
    <Routes>
      <Route
        path={routePaths.intro}
        element={<AuthRoute component={Intro} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.signIn}
        element={<AuthRoute component={SignIn} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.signUp}
        element={<AuthRoute component={SignUp} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.forgotPassword}
        element={<AuthRoute component={ForgotPassword} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.home}
        element={<PrivateRoute component={Home} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.profile}
        element={<PrivateRoute component={Profile} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.inbox}
        element={<PrivateRoute component={Inbox} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.event}
        element={<PrivateRoute component={Event} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.remoteUserProfile}
        element={<PrivateRoute component={RemoteUserProfile} isAuthenticated={isAuthenticated} />}
      />
      <Route
        path={routePaths.success}
        element={<PrivateRoute component={Success} isAuthenticated={isAuthenticated} />}
      />
    </Routes>
  );
}

export default UserRoutes;
