import React from 'react';
import Header from '../components/Header';
import '../css/Hijos.scss'

const Hijos = ({ onBack }) => {
  return (
    <div className="detail-content hijos">
      <Header text="Hijos" back={onBack} />

      <div id="hijos-section">
        <p className="title">Asociá a tus hijos menores en tu perfil para acceder a sus documentos.</p>
        <p className="description">Recordá que solo vas a poder asociar a tus hijos menores de 18 años que estén registrados en Renaper.</p>

        <button>
          <p>Asociar un hijo/a</p>
        </button>
      </div>
    </div>
  );
};

export default Hijos;
