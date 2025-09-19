import React from 'react';

const Tramites = ({ onBack }) => {
  return (
    <div className="detail-content">
      <button onClick={onBack} className="back-button">
        &larr; Volver
      </button>
      <h1>Trámites</h1>
      {/* El contenido para la página de Trámites irá aquí */}
    </div>
  );
};

export default Tramites;
