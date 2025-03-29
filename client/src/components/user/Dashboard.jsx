import React, { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken({ template: "default" }); // Retrieve Clerk Auth Token

                const response = await axios.get('http://localhost:5000/api/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setData(response.data.message);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [getToken]);

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user?.fullName || user?.username || 'User'}!</p>
            <p>{data ? data : 'Loading protected data...'}</p>
        </div>
    );
};

export default Dashboard;
