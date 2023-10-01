import React, { useState, useEffect } from 'react';
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

    return (
        <div className="LoginPage">
            <div className="login-welcome">Bem-vindo!</div>
            Digite seu login para começar.
            <div className="login-input">Login: <input name="user-login"></input></div>
            <div className="login-input">Nome: <input name="user-name"></input></div>
            <div className="login-input"><button>Entrar</button></div>
        </div>
    );
}

export default LoginPage;
