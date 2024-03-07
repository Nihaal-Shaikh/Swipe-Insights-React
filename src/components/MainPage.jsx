import { useState } from "react";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

export default function MainPage() {

  const [type, setType] = useState('login');

  let classes = "bg-white bg-opacity-25 p-8 rounded-md shadow-md w-full sm:w-96";

  // if(type === 'forgot-password') {
  //   classes += " transform perspective-1000 rotate-y-180"
  // }
    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-purple-700">
      <div className={classes}>
        <h1 className="text-3xl font-extrabold text-white mb-4">Swipe Insights</h1>
        <p className="text-lg text-gray-300 mb-8">Unlock the Future of Insights</p>
        {type === 'login' && <Login />}
        {type === 'forgot-password' && <ForgotPassword />}
        {type === 'login' && <button className="text-gray-300 hover:underline block mb-4" onClick={() => setType('forgot-password')}>
          Forgot Password?
        </button>}
        {/* <Link to="/forgot-password" className="text-gray-300 hover:underline block mb-4">
          Forgot Password?
        </Link> */}
      </div>
    </div>
  );
}
