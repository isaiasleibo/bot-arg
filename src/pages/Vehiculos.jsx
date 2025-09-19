import React from 'react';
import Header from '../components/Header';
import '../css/Vehiculos.scss'

const Vehiculos = ({ onBack }) => {
  return (
    <div className="detail-content vehiculos">
      <Header text="Vehículos" back={onBack} />

      <div id="texto-vehiculos">
        <p>Si viajas al exterior y no contás con cédula física y/o patente, comunícate con la <span>DNRPA</span> para asesorarte.</p>
        <img src={require('../img/texto-vehiculos.jpeg')} alt="" />
      </div>

      <div id="agrega-servicios">
        <p id="title">Agregá servicios</p>
        <p id="description">Asociá servicios para ver tu licencia de conducir y las cédulas de vehículos asociados a tu DNI.</p>
        <button>
          <p>Agregar servicios</p>
        </button>
      </div>
    </div>
  );
};

export default Vehiculos;
