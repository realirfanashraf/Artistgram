import {Routes,Route} from 'react-router-dom'
import SignUp from './Pages/userPages/authPages/SignUp'
import Home from './Pages/userPages/Home'
import SignIn from './Pages/userPages/authPages/SignIn'
import { PrivateRoute,AuthRoute } from './Components/userSide/RouteHandler'
import Login from './Pages/adminPages/authPages/Login'


function App() {
  return (
    <>
      <Routes>
        <Route path ='/home' element={<PrivateRoute> <Home/> </PrivateRoute>}/>
        <Route path='/signin' element={<AuthRoute> <SignIn/> </AuthRoute>} />
        <Route path='/signup' element={<AuthRoute> <SignUp/> </AuthRoute>} />
        <Route path='/admin' element={<Login/>}/>
      </Routes>  
    </>
  )
}

export default App
