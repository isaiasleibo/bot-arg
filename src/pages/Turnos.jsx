import React from 'react';
import Header from '../components/Header';
import '../css/Turnos.scss'

const Turnos = ({ onBack }) => {
  return (
    <div className="detail-content turnos">
      <Header text='Turnos' back={onBack} />

      <div id="turnos-programados">
        <img src={require('../img/no-tenes-turnos-programados.jpeg')} alt="" />
        <p>No tenés turnos programados</p>
        <button>
          <p>Sacá turno</p>
        </button>
      </div>
    </div>
  );
};

export default Turnos;
