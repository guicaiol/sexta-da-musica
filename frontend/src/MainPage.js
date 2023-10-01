import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import './MainPage.css'

function MainPage() {

    //const [users, setUsers] = useState([]);
    //const [user, setUser] = useState(null);
    const isLoggedIn = useState(false);

    function updateData() {
        /*
        // Update users
        fetch("/api/users")
            .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            response.json().then((data) => {
                setUsers(data)
            })
        });
        */
    }

    useEffect(() => {   
        // Update first time
        updateData();

        // Setup interval to update constantly
        const interval = setInterval(updateData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="MainPage">
            {isLoggedIn? <LoginPage /> : <HomePage />}
            {/*
            app-body
            Users:<br />
            {users.map((user) => (
            <div>{user.id} / {user.name}</div>
            ))}
            */}
            
        </div>
        <div className="Footer"><b>Sexta da Musica</b> - Contribua com esse projeto: <a href="https://github.com/guicaiol/sexta-da-musica" target="_blank" rel="noopener noreferrer">GitHub</a></div>
        </>
    );
}

export default MainPage;
