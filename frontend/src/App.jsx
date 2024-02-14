import {Route,Routes} from 'react-router-dom'
import SignUp from './Pages/userPages/SignUp'
import Home from './Pages/userPages/Home'
import SignIn from './Pages/userPages/SignIn'

function App() {
        
  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
