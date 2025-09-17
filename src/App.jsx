import React from 'react'
import './css/App.css'

const App = () => {
  return (
    <div>
        <header>
            <img id='hamburger-logo' src={require("./img/hamburger.jpeg")} alt="" />
            <img id='miargentina-logo' src={require("./img/miargentina-logo.jpeg")} alt="" />
            <img id='usuario-verificado' src={require("./img/usuario-verificado.jpeg")} alt="" />
        </header>
        <div id="second-header">
            <p>¡Hola, Isaias!</p>
        </div>
        <div id="turnos-programados">
            <img src={require("./img/turnos-programados.jpeg")} alt="" />
            <div>
                <p>No tenés turnos prgramados.</p>
                <button>
                    <p>Sacá turno</p>
                </button>
            </div>
        </div>
        <div id="crendeciales-al-dia">
            <p>¡Todas tus credenciales están al día!</p>
            <img src={require('./img/credenciales-al-dia.jpeg')} alt="" />
        </div>
    </div>
  )
}

export default App