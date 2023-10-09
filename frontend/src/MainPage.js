import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import LoadingPage from './LoadingPage';
import { ReactSession } from 'react-client-session';
import './MainPage.css'

function MainPage() {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function updateData() {
        // Check user session
        let session_user = ReactSession.get("user");
        if(session_user!=null) {
            // Check user exists
            fetch("/api/users/"+session_user.id)
                .then(async response => {
                    const isJson = response.headers.get('content-type').includes('application/json');
                    const data = isJson && await response.json();
                    if(!response.ok) {
                        const error = (data && data.message) || response.status;
                        alert("GET /api/users/"+session_user.id+" error: "+error+"\nData: "+data);
                        setUser(null);
                        setIsLoggedIn(false);
                        ReactSession.set("user", null);
                    } else {
                        setUser(session_user);
                        setIsLoggedIn(true);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            setLoading(false);
        }
    }

    useEffect(() => {
        // Update first time
        updateData();

        // Setup interval to update constantly
        const interval = setInterval(updateData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="MainPage">
            {loading? <LoadingPage /> : !isLoggedIn? <LoginPage /> : <HomePage user={user} />}
        </div>
        <div className="Footer"><b>Sexta da Musica</b> - Contribua com esse projeto: <a href="https://github.com/guicaiol/sexta-da-musica" target="_blank" rel="noopener noreferrer">GitHub</a></div>
        </>
    );
}

export default MainPage;
