import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function AddSwipeOption(props) {

  const navigate = useNavigate();
  
  const [status, setStatus] = useState('');
  const [active, setActive] = useState(1);
	const { editpage, editData } = props;
  const { id } = useParams();

  	// Edited data
	useEffect(() => {
		if (editpage) {
      setStatus(editData?.status);
      setActive(editData?.active);
		}
		if (!editpage) {
			setActive(1);
		}
	}, [props]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleActiveChange = (e) => {
    setActive(e.target.checked);
  };

  const handleSubmit = () => {
    const requestData = editpage
    ? { id, status, active }
    : { status, active };

    axios.post('http://127.0.0.1:8000/api/web-admin/add-image-status', requestData)
    .then(response => {
      console.log('API response:', response.data);
      setStatus('');
      setActive(false);
      navigate('/web-admin/swipe-options')
    })
    .catch(error => {
      console.error('API error:', error);
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-8 border shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Add Swipe Options</h1>
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