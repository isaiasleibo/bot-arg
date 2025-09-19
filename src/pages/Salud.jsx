import React from 'react';

const Salud = ({ onBack }) => {
  return (
    <div className="detail-content">
      <button onClick={onBack} className="back-button">
        &larr; Volver
      </button>
      <h1>Salud</h1>
      {/* El contenido para la página de Salud irá aquí */}
    </div>
  );
};

export default Salud;
