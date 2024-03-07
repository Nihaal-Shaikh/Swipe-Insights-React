import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ReactCardFlip from "react-card-flip";
import Register from "./Register";

export default function MainPage() {

  const [type, setType] = useState('login');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (type) => {
    setType(type);
    setIsFlipped((prevFlipped) => !prevFlipped);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-purple-700">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" >
        {type === 'login' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
          <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
          <p className="text-lg text-gray-300 mb-8">Unlock the Future of Insights</p>

          <Login>
            <div className="mt-4">
              <button onClick={() => handleClick('forgot-password')}>Forgot password?</button>
            </div>
            <div>
              <button onClick={() => handleClick('register')}>Register</button>
            </div>
          </Login>
        </div>}
        <>
          {type === 'forgot-password' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
            <p className="text-lg text-gray-300 mb-8">Unlock the Future of Insights</p>
            <ForgotPassword>
              <button className="mt-4" onClick={() => handleClick('login')}>Go back</button>
            </ForgotPassword>
          </div>}
          {type === 'register' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
            <p className="text-lg text-gray-300 mb-8">Unlock the Future of Insights</p>
            <Register>
              <button className="mt-4" onClick={() => handleClick('login')}>Go back</button>
            </Register>
          </div>}
        </>
      </ReactCardFlip>
    </div>
  );
}
