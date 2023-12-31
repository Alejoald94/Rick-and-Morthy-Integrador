import React, { useState } from 'react';
function LoginForm({ onLogin, onRegister, errorMessage }) {  // Añade errorMessage como prop
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(''); 

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length > 0 && e.target.value.length < 7) {
            setPasswordError('La contraseña debe tener al menos 7 caracteres.');
        } else {
            setPasswordError('');
        }
    };

    return (
        <div style={loginFormStyle}>
            <h2 style={titleStyle}>Bienvenidos</h2>
            <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: '10px 0', padding: '10px', borderRadius: '5px' }}
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={password}
                onChange={handlePasswordChange}
                maxLength={16}
                style={{ margin: '10px 0', padding: '10px', borderRadius: '5px' }}
            />
            <p style={{ color: 'red', minHeight: '20px' }}>{passwordError}</p>
            {errorMessage && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>}
            <div>
                <button 
                    onClick={() => onLogin(email, password)}
                    disabled={password.length < 7 || password.length > 16}
                    style={buttonStyle}
                >
                    Login
                </button>
                <button 
                    onClick={() => onRegister(email, password)}
                    disabled={password.length < 7 || password.length > 16}
                    style={buttonStyle}
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}


// Estilo para el título "Bienvenidos"
const titleStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)'
};

// Estilo para el formulario de inicio de sesión
const loginFormStyle = {
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
};

// Estilo para los botones
const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    transition: 'background-color 0.3s'
};

export default LoginForm;
