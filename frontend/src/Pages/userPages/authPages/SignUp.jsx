import { useState } from 'react';
import { Axios } from '../../../axios/userInstance.js';
import { useNavigate, Link } from 'react-router-dom';
import { showErrorMessage, showSuccessMessage } from '../../../helper/sweetalert';

const SignUp = () => {
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStep, setVerificationStep] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setFormErrors({ ...formErrors, [e.target.name]: '' });

  };

  const handleInputCode = (e)=>{
    setVerificationCode(e.target.value)
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^.{8,}$/;

    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    }

    if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'The passwords do not match.';
    }

    setFormErrors(errors);

    setTimeout(() => {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }, 2000);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setVerificationStep(true);
    

    
  };

  const handleVerify = (e)=>{
    e.preventDefault()
    const requestData = { ...formData, verificationCode }; 
   Axios.post('/signup', requestData)
     .then((response) => {

      console.log("akjds")
       navigate('/signin');
       showSuccessMessage(response.data.message);
     })
     .catch((error) => {
      console.log("frontend error adhfkjadf")
       showErrorMessage(error);
     });
   }

  return (
    <>
    <div className="flex mt-1 min-h-screen flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <h2 className="text-center text-3xl font-protest leading-9 tracking-tight text-white">
        {!verificationStep ? "SignUp" : "Verification"}
      </h2>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        {!verificationStep ? (
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
                {formErrors.name && <span className="text-black">{formErrors.name}</span>}
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
                {formErrors.email && <span className="text-black">{formErrors.email}</span>}
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
                {formErrors.password && <span className="text-black">{formErrors.password}</span>}
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
                {formErrors.confirmPassword && (
                  <span className="text-black">{formErrors.confirmPassword}</span>
                )}
              </div>
            </div>

            <div>
              <button type="submit" className="authbtn" onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="Code" className="authfont">
                Code
              </label>
              <div className="mt-1">
                <input
                  id="Code"
                  name="Code"
                  type="text"
                  autoComplete="Code"
                  required
                  className="inputfield"
                  value={verificationCode}
                  onChange={handleInputCode}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="authbtn" onClick={handleVerify}>
                Verify
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  </>
  );
};

export default SignUp;
