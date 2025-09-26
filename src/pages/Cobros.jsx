import React from 'react';
import Header from '../components/Header'
import '../css/Cobros.scss'

const Cobros = ({ onBack }) => {
  return (
    <div className="detail-content cobros">
      <Header text="Cobros" back={onBack} />

      <div className="cobros-section">
        <p className="title">Actualización de datos - PAS</p>
        <p className="description">Si sos beneficiario del Programa de Acompañamiento social debés completar el formulario de actualización de datos.</p>
        <button>
          <p>Ingresar</p>
        </button>
      </div>
      <div className="cobros-section">
        <p className="title">¿Necesitás ayuda?</p>
        <p className="description">Podes realizar consultas o denunciar cualquier irregularidad en los programas del Ministerio de Capital Humano de manera segura y confiedncial.</p>
        <button>
          <p>Contactanos</p>
        </button>
      </div>
    </div>
  );
};

export default Cobros;
