import React from 'react';
import Header from '../components/Header'
import '../css/Salud.scss'

const Salud = ({ onBack }) => {
  return (
    <div className="detail-content salud">
      <Header text="Salud" back={onBack} />

      <div id="cobertura-de-salud">
        <p className="title">Cobertura de Salud</p>

        <div id="divider-horizontal"></div>

        <div id="cobertura">
          <img src={require('../img/cobertura-de-salud.jpeg')} alt="" />
          <p>Cobertura Pública Exclusiva</p>
        </div>

        <div id="divider-horizontal"></div>

        <div id="suministrado-por">
          <p>Datos suministrados por</p>
          <span>Ministerio de Salud</span>
        </div>

        <div id="divider-horizontal" className='end'></div>
      </div>

      <p className="salud-title">Credenciales</p>

      <div id="donacion-de-organos">
        <div className="header-section">
          <img src={require('../img/donacion-de-organos.jpeg')} alt="" />
          <div id="divider"></div>
          <p>Donación de organos</p>
        </div>

        <div id="divider-horizontal" className='first'></div>

        <div id="voluntad-de-donar">
          <p>Expresá tu voluntad hacia la donación. es fácil y rápido.</p>
          <button>
            <p>Expresá tu voluntad de donar</p>
          </button>
        </div>

        <div id="divider-horizontal"></div>

        <div id="suministrado-por">
          <p>Datos suministrados por</p>
          <span>INCUCAI</span>
        </div>

        <div id="divider-horizontal" className="end"></div>
      </div>

      <p className="salud-title">Más información de salud</p>

      <div id="vacunas-de-calendario">
        <div className="header-section">
          <img src={require('../img/vacunas-de-calendario.jpeg')} alt="" />
          <div id="divider"></div>
          <p>Vacunas de calendario</p>
        </div>

        <div id="divider-horizontal" className="first"></div>

        <div id="texts">
          <p className="description">Consultá tus vacunas de calendario registradas en el Ministerio de Salud de la Nación.</p>
          <p className="description">Es posible que algunas dosis aplicadas no se mustren porque el registro es obligatorio desde el 2023.</p>
        </div>

        <button>
          <p>Ver mis vacunas</p>
        </button>

        <div id="divider-horizontal" className="end"></div>
      </div>
    </div>
  );
};

export default Salud;
