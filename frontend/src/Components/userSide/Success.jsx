import { useParams } from 'react-router-dom';
import { Axios } from '../../axios/userInstance.js';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const { eventId } = useParams();
  console.log(eventId,"event id")
  const navigate = useNavigate();
  const hasFetchedData = useRef(false);


  useEffect(() => {
    if (!hasFetchedData.current) {
      Axios.post('/action/paymentDone', { eventId })
        .then((response) => {
          if (response.data) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });

      hasFetchedData.current = true;
    }
  }, []);



  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex justify-center">
      <img className="max-w-64" src='/images/success.gif' alt="Animation" />
    </div>
  
    <div className=" text-white text-2xl text-center font-protest">
      Payment completed successfully
      <div className="mt-6">
        <button className="authbtn" onClick={handleClick}>
          Back to Home
        </button>
      </div>
    </div>
  </div>
  
  );
}

export default Success;
