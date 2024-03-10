// Sidebar.jsx

import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/5 p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="text-blue-300 hover:text-blue-500">Dashboard</a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-300 hover:text-blue-500">Analytics</a>
        </li>
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
