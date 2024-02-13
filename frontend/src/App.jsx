import {Route,Routes} from 'react-router-dom'
import Login from './Pages/userPages/Login'
import SignUp from './Pages/userPages/SignUp'
import Home from './Pages/userPages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
