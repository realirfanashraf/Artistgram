import {Routes,Route} from 'react-router-dom'
import SignUp from './Pages/userPages/SignUp'
import Home from './Pages/userPages/Home'
import SignIn from './Pages/userPages/SignIn'
import { PrivateRoute,AuthRoute } from './Components/userSide/RouteHandler'


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
