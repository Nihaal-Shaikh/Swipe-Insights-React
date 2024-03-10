import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AddSwipeOption() {

  const navigate = useNavigate();
  
  const [status, setStatus] = useState('');
  const [active, setActive] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleActiveChange = (e) => {
    setActive(e.target.checked);
  };

  const handleSubmit = () => {
    console.log(status);
    console.log(active);
    axios.post('http://127.0.0.1:8000/api/web-admin/add-image-status', {
      status,
      active,
    })
    .then(response => {
      // Handle the response as needed
      console.log('API response:', response.data);
      setStatus('');
      setActive(false);
      navigate('/web-admin/swipe-options')
    })
    .catch(error => {
      // Handle errors
      console.error('API error:', error);
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-8 border shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Add Swipe Options</h1>

        {/* Status Field */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <input
            type="text"
            id="status"
            name="status"
            value={status}
            onChange={handleStatusChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Active Field */}
        <div className="mb-4">
          <label htmlFor="active" className="block text-sm font-medium text-gray-600">
            Active
          </label>
          <div className="mt-1">
            <input
              type="radio"
              id="active"
              name="active"
              checked={active}
              onChange={handleActiveChange}
              className="mr-2"
            />
            <label htmlFor="active" className="text-sm">
              Yes
            </label>
          </div>
          <div className="mt-1">
            <input
              type="radio"
              id="inactive"
              name="active"
              checked={!active}
              onChange={() => setActive(false)}
              className="mr-2"
            />
            <label htmlFor="inactive" className="text-sm">
              No
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </div>
    </div>
  );
};