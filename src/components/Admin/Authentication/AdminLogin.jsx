import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin({ children }) {

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

            const tokenable_id = response.data.token.tokenable_id;
            const user_name = response.data.name;

            // Store tokenableId in localStorage
            localStorage.setItem("tokenableId", tokenable_id);
            localStorage.setItem("userName", user_name);

            navigate("/image-swiper");

            // Handle the token as needed (store in localStorage, context, etc.)

            setIsLoggedIn(true);
            // You may want to redirect or perform other actions here
        } catch (error) {
            console.error("Error during login:", error);
            // Handle login error (show a message, redirect, etc.)
        }
    };  
    
    // Check localStorage for tokenableId on component mount
    useEffect(() => {
      const storedTokenableId = localStorage.getItem("tokenableId");
  
      if (storedTokenableId) {
        navigate('/image-swiper');
      }
    }, [navigate]);

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