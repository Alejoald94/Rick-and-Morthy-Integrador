import React, { useState } from 'react';
import './App.css';
import CharacterList from './CharacterList';
import LoginForm from './LoginForm';
import { BrowserRouter } from 'react-router-dom';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (email, password) => {
        const storedPassword = localStorage.getItem(email);
        if (storedPassword) {
            if (storedPassword === password) {
                setIsLoggedIn(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Contraseña incorrecta.');
            }
        } else {
            setErrorMessage('No existe usuario, regístrese.');
        }
    };
    
    const handleRegister = (email, password) => {
        if (localStorage.getItem(email)) {
            setErrorMessage('El usuario ya existe.');
        } else {
            localStorage.setItem(email, password);
            setIsLoggedIn(true);
            setErrorMessage('');
        }
    };

    return (
        <BrowserRouter>
            <div className={`App ${isLoggedIn ? 'App-loggedIn' : ''}`}>
                <header className="App-header"></header>
                {isLoggedIn ? (
                    <CharacterList />
                ) : (
                    <LoginForm 
                        onLogin={handleLogin}
                        onRegister={handleRegister}
                        errorMessage={errorMessage}
                    />
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
