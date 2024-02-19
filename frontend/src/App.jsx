import {Routes,Route} from 'react-router-dom'
import SignUp from './Pages/userPages/authPages/SignUp'
import Home from './Pages/userPages/Home'
import SignIn from './Pages/userPages/authPages/SignIn'
import { PrivateRoute,AuthRoute, AdminAuthRoute, AdminPrivateRoute } from './Components/userSide/RouteHandler'
import Login from './Pages/adminPages/authPages/Login'
import Dashboard from './Pages/adminPages/Dashboard'


function App() {
  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route path ='/home' element={<PrivateRoute component={Home}/>}/>
        <Route path='/signin' element={<AuthRoute component={SignIn}/>} />
        <Route path='/signup' element={<AuthRoute component={SignUp}/>} />

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminAuthRoute component={Login}/>}/>
        <Route path='/admin/dashboard' element={<AdminPrivateRoute component={Dashboard}/>}/>
      </Routes>  
    </>
  )
}

export default App
