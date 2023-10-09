import React, { useState, useEffect } from 'react';
import { ReactSession } from 'react-client-session';
import './LoginPage.css'

function LoginPage() {

    function updateData() {

    }

    useEffect(() => {   
        // Update first time
        updateData();

        // Setup interval to update constantly
        const interval = setInterval(updateData, 1000);
        return () => clearInterval(interval);
    }, []);

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: inputs.user_login, name: inputs.user_name })
        };
        fetch("/api/users", options)
            .then(async response => {
                const isJson = response.headers.get('content-type').includes('application/json');
                const data = isJson && await response.json();

                if(!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    alert("POST /api/users error: "+error+"\nData: "+data);
                } else {
                    ReactSession.set("user", {"id": inputs.user_login, "name": inputs.user_name});
                    alert("Usuário criado!");
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <div className="LoginPage">
            <div className="login-welcome">Bem-vindo!</div>
            Digite seu login para começar.
            <form onSubmit={handleSubmit}>
                <div className="login-input">Login: <input type="text" name="user_login" value={inputs.user_login || ""} onChange={handleChange}></input></div>
                <div className="login-input">Nome: <input type="text" name="user_name" value={inputs.user_name || ""} onChange={handleChange}></input></div>
                <div className="login-input"><input type="submit" name="user_submit" value="Entrar" /></div>
            </form>
        </div>
    );
}

export default LoginPage;
