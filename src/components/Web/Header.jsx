import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const userName = localStorage.getItem("userName")
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1>Welcome, {userName}</h1>
            <div>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md focus:outline-none">
                    Logout
                </button>
            </div>
        </header>
    );
};