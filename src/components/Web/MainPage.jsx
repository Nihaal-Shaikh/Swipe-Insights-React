import { useState } from "react";
import Login from "./Authentication/Login";
import ForgotPassword from "./Authentication/ForgotPassword";
import ReactCardFlip from "react-card-flip";
import Register from "./Authentication/Register";

export default function MainPage() {

  const [type, setType] = useState('login');
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (type) => {
    setType(type);
    setIsFlipped((prevFlipped) => !prevFlipped);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-300">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" >
        {type === 'login' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
          <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
          <p className="text-lg text-white mb-8">Unlock the Future of Insights</p>

          <Login>
            <div className="mt-4">
              <button className="italic" onClick={() => handleClick('forgot-password')}>Forgot password?</button>
            </div>
            <div>
              <button onClick={() => handleClick('register')}>Register</button>
            </div>
          </Login>
        </div>}
        <>
          {type === 'forgot-password' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
            <p className="text-lg text-white mb-8">Unlock the Future of Insights</p>
            <ForgotPassword>
              <button className="mt-4" onClick={() => handleClick('login')}>Go back</button>
            </ForgotPassword>
          </div>}
          {type === 'register' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
            <p className="text-lg text-white mb-8">Unlock the Future of Insights</p>
            <Register>
              <button className="mt-4" onClick={() => handleClick('login')}>Go back</button>
            </Register>
          </div>}
        </>
      </ReactCardFlip>
    </div>
  );
}
