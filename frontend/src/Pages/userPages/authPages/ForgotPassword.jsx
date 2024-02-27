import { useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import {Axios} from '../../../axios/userInstance.js'
import { showErrorMessage } from '../../../helper/sweetalert.js';


const ForgotPassword = () => {
    const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [codee , setCode] =useState('')

  const handleGetOTP = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return swal('Invalid input', 'Please enter a valid email address.', 'error');
    }
    Axios.post('/forgotpassword',{email})
    .then((response)=>{
      swal('OTP sent successfully','Please Check your Email','success')
      setCode(response.data.code)
    }).catch((error)=>{
      showErrorMessage(error)
    })
    setShowOTPField(true);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if(codee != undefined && otp == codee) {
      setSuccess(true)
      swal('Verified', 'Otp verification succesfull', 'success')
    }else{
      swal('Failed', 'Otp verification failed','error')
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('/changePassword', { email, newPassword });
      if (response.status === 200) {
        swal('Password Changed!', 'Your password has been successfully changed.', 'success');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error:', error.response.data.message);
      swal('Error', 'Failed to change password. Please try again later.', 'error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-sm w-full">
        <h2 className="mt-10 text-center text-3xl font-protest leading-9 tracking-tight text-white">
          Forgot Password
        </h2>
        <form onSubmit={showOTPField ? handleVerifyOTP : handleGetOTP}>
          <div className="mt-8">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {!showOTPField ? (
              <button type="submit" className="authbtn mt-4">
                Get OTP
              </button>
            ) : (
              <>
                {success ? (
                  <div className="mt-2">
                    <label htmlFor="newPassword" className="authfont">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="inputfield"
                    />
                    <button type="submit" className="authbtn mt-4" onClick={handleChangePassword}>
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <label htmlFor="otp" className="authfont">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      className="inputfield"
                    />
                    <button type="submit" className="authbtn mt-4">
                      Verify OTP
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
