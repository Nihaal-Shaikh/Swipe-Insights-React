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

    return (<>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-300">
            <div>
                <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={`http://127.0.0.1:8000/${image}`}
                        alt={`Image ${index}`}
                        className="w-full object-cover h-64 rounded-md"
                    />
                ))}
            </div>
        </div>
    </>
    );
};

export default Dashboard;
