import { useState } from "react";
import AdminLogin from "./AdminLogin";
import ReactCardFlip from "react-card-flip";
import AdminForgotPassword from "./AdminForgotPassword";
import AdminRegister from "./AdminRegister";

export default function AdminMainPage() {

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
          <p className="text-lg text-white mb-8">Welcome to the CMS of Swipe Insights</p>

          <AdminLogin>
            <div className="mt-4">
              <button className="italic" onClick={() => handleClick('forgot-password')}>Forgot password?</button>
            </div>
            <div>
              <button onClick={() => handleClick('register')}>Register</button>
            </div>
          </AdminLogin>
        </div>}
        <>
          {type === 'forgot-password' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
            <p className="text-lg text-gray-300 mb-8">Welcome to the CMS of Swipe Insights</p>
            <AdminForgotPassword>
              <button className="mt-4" onClick={() => handleClick('login')}>Go back</button>
            </AdminForgotPassword>
          </div>}
          {type === 'register' && <div className="bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96">
            <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
            <p className="text-lg text-gray-300 mb-8">Unlock the Future of Insights</p>
            <AdminRegister>
              <button className="mt-4" onClick={() => handleClick('login')}>Go back</button>
            </AdminRegister>
          </div>}
        </>
      </ReactCardFlip>
    </div>
  );
}
