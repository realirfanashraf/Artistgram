import  { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom';
import { Axios } from '../../../axios/userInstance';
import { showErrorMessage,showSuccessMessage } from '../../../helper/sweetalert';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../../../redux/slices/userSlices/authSlice.js'


const SignIn = () => {
  const dispatch = useDispatch();
  
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/signin', formData,{withCredentials:true})
    .then((response) => {
      dispatch(setAuthenticated(true));
      navigate('/home')
      showSuccessMessage(response.data.message);
    })
    .catch((error) => {
      showErrorMessage(error);
    });
  };

  return (
    <>
    
    <div className="flex max-h-full flex-1 flex-col justify-center  px-6 py-20 lg:px-8">
    <h2 className="mt-10 text-center text-3xl font-protest leading-9 tracking-tight text-white">
            Sign In
          </h2>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="authfont">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="inputfield"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="authfont">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className=" font-protest text-black hover:text-gray-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="inputfield"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="absolute inset-y-0 right-0 w-6 h-6 m-2 pointer-events-none">
                  <path d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="authbtn"
                onClick={handleSubmit}
              >
                Sign in
                
              </button>
            </div>
          </form>

          <p className=" text-start text-sm text-black font-protest">
            Not a member?{' '}
            <Link to="/signup" className="leading-6 text-black hover:text-gray-600 font-protest">
              Signup Now
            </Link>
          </p>
          
        </div>
      </div>
    </>
  )
}

export default SignIn