import React from 'react';

const Trabajo = ({ onBack }) => {
  return (
    <div className="detail-content">
      <button onClick={onBack} className="back-button">
        &larr; Volver
      </button>
      <h1>Trabajo</h1>
      {/* El contenido para la página de Trabajo irá aquí */}
    </div>
  );
};

export default Trabajo;
