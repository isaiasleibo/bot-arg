import React, { useState } from 'react';
import '../css/Login.scss'

const Login = ({ onBack, onLoginSuccess, onNavigateToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login exitoso...');
                // --- INICIO DE CAMBIOS ---
                // Guardamos el token JWT en localStorage en lugar de las credenciales
                localStorage.setItem('authToken', data.token);
                // --- FIN DE CAMBIOS ---
                onLoginSuccess(data.userData);
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            console.error('Error de red:', err);
            setError('No se pudo conectar al servidor. Inténtelo más tarde.');
        }
    };

    return (
        <div className="login">
            <div id="header-login">
                <img id='atras' src={require('../img/atras-white.jpeg')} alt="Atrás" onClick={onBack} />
            </div>

            <img id='logo' src={require('../img/login-logo.jpeg')} alt="Logo Mi Argentina" />

            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Ingrese su E-Mail' 
                    required 
                />
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Contraseña' 
                    required 
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">
                    <p>Ingresar a mi cuenta</p>
                </button>
                <p className="recover-password">Recuperar mi contraseña</p>
            </form>

            <div id="divider-horizontal"></div>

            <div id="create-account">
                <p>¿No tenés cuenta en Mi Argentina?</p>
                <button onClick={onNavigateToRegister}>
                    <p>Crear cuenta</p>
                </button>
            </div>
        </div>
    );
};

export default Login;
