import { useState } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";

export default function Login({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Assuming your Laravel API returns a token upon successful login
      const token = response.data.value;
      navigate("/image-swiper");

      // Handle the token as needed (store in localStorage, context, etc.)

      setIsLoggedIn(true);
      // You may want to redirect or perform other actions here
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (show a message, redirect, etc.)
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-teal-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition duration-300 focus:outline-none"
        >
          Login
        </button>
      </form>
      {children}
    </>
  );
}