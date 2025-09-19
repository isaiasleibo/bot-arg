import React from 'react';

const Hijos = ({ onBack }) => {
  return (
    <div className="detail-content">
      <button onClick={onBack} className="back-button">
        &larr; Volver
      </button>
      <h1>Hijos</h1>
      {/* El contenido para la página de Hijos irá aquí */}
    </div>
  );
};

export default Hijos;
