import React from 'react';
import '../css/Telefonos.scss'

const Telefono = ({ telefono, nombre }) => {
    return (
        <div className="telefono" onClick={() => (window.location.href = `tel:${telefono}`)}>
            <div className="data">
                <p className="numero">{telefono}</p>
                <div id="divider"></div>
                <div className="nombre">{nombre}</div>
            </div>
            <img src={require('../img/telefonos.jpeg')} alt="" />
        </div>
    )
}

function Telefonos() {
    return (
        <div className='footer-page telefonos'>
            <header>
                <img id='hamburger-logo' src={require("../img/hamburger.jpeg")} alt="Menu" />
                <img id='miargentina-logo' src={require("../img/miargentina-logo.jpeg")} alt="Mi Argentina" />
                <img id='usuario-verificado' src={require("../img/usuario-verificado.jpeg")} alt="Usuario Verificado" />
            </header>

            <div id="numeros-de-telefono">
                <Telefono telefono={911} nombre="Central de emergencia nacional" />
                <Telefono telefono={144} nombre="Victimas de violencia" />
                <Telefono telefono={107} nombre="Emergencias Médicas" />
                <Telefono telefono={100} nombre="Bomberos" />
                <Telefono telefono={102} nombre="La línea de los chicos" />
                <Telefono telefono={103} nombre="Defensa Civil" />
                <Telefono telefono={106} nombre="Emergencia Náutica" />
                <Telefono telefono={134} nombre="Denunciá delitos y extorsiones" />
                <Telefono telefono={135} nombre="Asistencia al Suicida" />
                <Telefono telefono={141} nombre="Ayuda Sedronar" />
                <Telefono telefono={142} nombre="Menores extraviados" />
                <Telefono telefono={145} nombre="Denuncia de trata" />
                <Telefono telefono={149} nombre="Víctima de delitos" />
            </div>
        </div>
    );
}

export default Telefonos;
