import React, { useState } from 'react';
import './App.css';
import CharacterList from './CharacterList';
import LoginForm from './LoginForm';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para el inicio de sesión

    return (
        <div className="App">
            <header className="App-header">
            </header>

            {isLoggedIn ? (
                // Si el usuario ha iniciado sesión, muestra la lista de personajes
                <CharacterList />
            ) : (
                // Si el usuario no ha iniciado sesión, muestra el formulario de inicio de sesión
                <LoginForm 
                    onLogin={(email, password) => {
                        console.log("Intento de inicio de sesión con:", email, password);
                        // Aquí puedes agregar la lógica para autenticar al usuario
                        setIsLoggedIn(true); // Considera el inicio de sesión como exitoso para este ejemplo
                    }}
                    onRegister={(email, password) => {
                        console.log("Intento de registro con:", email, password);
                        // Aquí puedes agregar la lógica para registrar al usuario
                        setIsLoggedIn(true); // Considera el registro como exitoso para este ejemplo
                    }}
                />
            )}
        </div>
    );
}

export default App;
