import {Route,Routes} from 'react-router-dom'
import Login from './Pages/userPages/Login'
import SignUp from './Pages/userPages/SignUp'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
