import React from 'react';
import '../css/Home.scss'

const Home = ({ onNavigate }) => {
  return (
    <>
      <header>
        <img id='hamburger-logo' src={require("../img/hamburger.jpeg")} alt="Menu" />
        <img id='miargentina-logo' src={require("../img/miargentina-logo.jpeg")} alt="Mi Argentina" />
        <img id='usuario-verificado' src={require("../img/usuario-verificado.jpeg")} alt="Usuario Verificado" />
      </header>
      <div id="second-header">
        <p>¡Hola, Isaias!</p>
      </div>
      <div id="turnos-programados">
        <img src={require("../img/turnos-programados.jpeg")} alt="" />
        <div>
          <p>No tenés turnos programados.</p>
          <button>
            <p>Sacá turno</p>
          </button>
        </div>
      </div>
      <div id="crendeciales-al-dia">
        <p>¡Todas tus credenciales están al día!</p>
        <img src={require('../img/credenciales-al-dia.jpeg')} alt="" />
      </div>

      <div id="pages">
        <p id='title'>¿Qué necesitás hoy?</p>
        <div id="cards">
          <div className="card" onClick={() => onNavigate('Documentos')}>
            <img src={require('../img/documentos.jpeg')} alt="" />
            <p>Documentos</p>
          </div>
          <div className="card" onClick={() => onNavigate('Vehiculos')}>
            <img src={require('../img/vehiculos.jpeg')} alt="" />
            <p>Vehículos</p>
          </div>
          <div className="card" onClick={() => onNavigate('Trabajo')}>
            <img src={require('../img/trabajo.jpeg')} alt="" />
            <p>Trabajo</p>
          </div>
          <div className="card" onClick={() => onNavigate('Salud')}>
            <img src={require('../img/salud.jpeg')} alt="" />
            <p>Salud</p>
          </div>
          <div className="card" onClick={() => onNavigate('Cobros')}>
            <img src={require('../img/cobros.jpeg')} alt="" />
            <p>Cobros</p>
          </div>
          <div className="card" onClick={() => onNavigate('Tramites')}>
            <img src={require('../img/tramites.jpeg')} alt="" />
            <p>Trámites</p>
          </div>
          <div className="card" onClick={() => onNavigate('Turnos')}>
            <img src={require('../img/turnos.jpeg')} alt="" />
            <p>Turnos</p>
          </div>
          <div className="card" onClick={() => onNavigate('Hijos')}>
            <img src={require('../img/hijos.jpeg')} alt="" />
            <p>Hijos</p>
          </div>
        </div>
      </div>

      <div id="suscribir-servicios">
        <img src={require('../img/suscribir-servicios.jpeg')} alt="" />
        <div>
          <p id="title">Suscribí servicios</p>
          <p id="description">Elegí los servicios que querés ver en la aplicación</p>
        </div>
      </div>

      
    </>
  );
};

export default Home;
