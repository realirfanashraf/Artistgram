import { Link } from 'react-router-dom'

const Intro = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="mb-8 font-protest text-3xl text-white">
        Welcome to our platform where the arts come together virtually, fostering connections and encouraging exploration
      </p>
      <p className="text-lg font-protest text-white opacity-75">- Artistgram -</p>
      <Link to='/signin' className="mt-12 px-6 py-3 font-protest bg-primary text-white rounded-full hover:bg-secondary transition duration-300 ease-in-out transform hover:scale-105">
        Explore Now
      </Link>
    </div>
  );
};

export default Intro;
