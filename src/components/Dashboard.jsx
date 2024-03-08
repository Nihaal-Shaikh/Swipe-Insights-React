import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/images')
            .then(response => {

                const modifiedImages = response.data.images.map(image =>
                    image.replace('public', 'storage')
                );
                setImages(modifiedImages);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
            });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={`http://127.0.0.1:8000/${image}`}
                        alt={`Image ${index}`}
                        className="w-full object-cover h-48 rounded-md"
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
