import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useUser } from '../../Kontext/User';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './PridajProdukt.css'
import axios from 'axios';


const PridajProdukt = () => {
    const { loggedInUser, logoutUser } = useUser();
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        // Fetch colors from the database using axios or any other library
        axios.get('/api/colors') // Update the endpoint based on your API
            .then(response => {
                setColors(response.data); // Assuming the response contains an array of colors
            })
            .catch(error => {
                console.error('Error fetching colors:', error);
            });
    }, []);

    if (!loggedInUser || loggedInUser.admin !== 1) {
        return <Navigate to='/' />;
    }

    return (
        <div>
            {/* Your existing content */}
            <div>
                {/* Dropdown for colors */}
                <label>Select Color:</label>
                <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                    <option value="">-- Choose a color --</option>
                    {colors.map(color => (
                        <option key={color.id} value={color.name}>
                            {color.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default PridajProdukt;