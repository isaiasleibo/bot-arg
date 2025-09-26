import React from 'react';
import '../css/PreLogin.scss'

/**
 * Componente inicial que se muestra antes de la pantalla de login.
 * Contiene un botón para navegar a la pantalla de inicio de sesión.
 */
const PreLogin = ({ onNavigateToLogin, onNavigateToRegister }) => {
    return (
        <div className="prelogin">
            <div id="image-container">
                <img src={require('../img/prelogin-logo.jpeg')} alt="" />
            </div>

            <div id='main-content'>
                <button id='ingresar' onClick={onNavigateToLogin}>
                    <p>Ingresar con mi cuenta</p>
                </button>

                <div id="divider-horizontal"></div>

                <p id='no-tenes-cuenta'>¿No tenés cuenta en Mi Argentina?</p>

                <button id='crear-cuenta' onClick={onNavigateToRegister}>
                    <p>Crear una cuenta</p>
                </button>
            </div>
        </div>
    );
};

export default PreLogin;
