import React from 'react';
import '../css/Novedades.scss'

// Este es un componente vacío para la página de Novedades.
// Puedes agregar aquí el contenido que necesites.
function Novedades() {
    return (
        <div className='footer-page novedades'>
            <header>
                <img id='hamburger-logo' src={require("../img/hamburger.jpeg")} alt="Menu" />
                <img id='miargentina-logo' src={require("../img/miargentina-logo.jpeg")} alt="Mi Argentina" />
                <img id='usuario-verificado' src={require("../img/usuario-verificado.jpeg")} alt="Usuario Verificado" />
            </header>

            <div id="novedades-container">
                <img src={require('../img/novedades-image.jpeg')} alt="" />
                <p>No hay novedades para mostrar en este momento.</p>
                <button>
                    <p>Volver al inicio</p>
                </button>
            </div>
        </div>
    );
}

export default Novedades;
