import {Routes,Route} from 'react-router-dom'
import SignUp from './Pages/userPages/SignUp'
import Home from './Pages/userPages/Home'
import SignIn from './Pages/userPages/SignIn'
import {PrivateRoute} from './Components/userSide/PrivateRoute'
import {AuthRoute} from './Components/userSide/AuthRoute'
import { checkJWTToken } from './helper/checkJwtToken'


function App() {
  return (
    <>
      <Routes>
        <Route path ='/home' element={<PrivateRoute> <Home/> </PrivateRoute>}/>
        <Route path='/signin' element={<AuthRoute> <SignIn/> </AuthRoute>} />
        <Route path='/signup' element={<AuthRoute> <SignUp/> </AuthRoute>} />
        
      </Routes>
    </>
  )
}

export default App
