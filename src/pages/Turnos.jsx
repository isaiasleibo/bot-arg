import React from 'react';

const Turnos = ({ onBack }) => {
  return (
    <div className="detail-content">
      <button onClick={onBack} className="back-button">
        &larr; Volver
      </button>
      <h1>Turnos</h1>
      {/* El contenido para la página de Turnos irá aquí */}
    </div>
  );
};

export default Turnos;
