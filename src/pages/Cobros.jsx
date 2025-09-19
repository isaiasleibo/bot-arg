import React from 'react';

const Cobros = ({ onBack }) => {
  return (
    <div className="detail-content">
      <button onClick={onBack} className="back-button">
        &larr; Volver
      </button>
      <h1>Cobros</h1>
      {/* El contenido para la página de Cobros irá aquí */}
    </div>
  );
};

export default Cobros;
