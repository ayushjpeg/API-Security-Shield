import React from 'react';

const Home = () => {
    const token = localStorage.getItem('access_token'); // Retrieve token from localStorage

    return (
        <div>
            <h2>Welcome to the Home Page</h2>
            <p>{token ? `Your token is: ${token}` : 'No token found'}</p>
        </div>
    );
};

export default Home;
