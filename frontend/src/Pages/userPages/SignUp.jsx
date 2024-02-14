import React, { useState } from 'react'
import { Axios } from '../../axios/userInstance';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import { showErrorMessage,showSuccessMessage } from '../../helper/sweetalert';

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    if (formData.password !== formData.confirmPassword) {
      return swal('Invalid password', 'The passwords do not match.', 'error');
    }

    Axios.post('/signup', formData)
    .then((response) => {
      navigate('/signin')
      showSuccessMessage(response.data.message);
    })
    .catch((error) => {
      showErrorMessage(error);
    });
  };
  
  return (

<>
  <div className="flex mt-1 min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <h2 className=" text-center text-3xl font-protest leading-9 tracking-tight text-white">
      Sign Up
    </h2>

    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="name" className="authfont">
            Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="inputfield"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="authfont">
            Email address
          </label>
          <div className="mt-1">
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
          <label htmlFor="password" className="authfont">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="inputfield"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="authfont">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="inputfield"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="authbtn"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>

      <p className=" text-start text-sm text-black font-protest">
        Already a member?{' '}
        <a href="#" className="leading-6 text-black hover:text-gray-600 font-protest">
          Sign In
        </a>
      </p>
      <p className='text-center mb-2 font-protest'>OR</p>
      <button
        type="submit"
        className="authbtn"
        
      >
        Sign Up with Google
      </button>
    </div>
  </div>
</>

  
  )
}

export default SignUp