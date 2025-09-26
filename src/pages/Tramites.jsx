import React from 'react';
import Header from '../components/Header';
import '../css/Tramites.scss'

const Tramites = ({ onBack }) => {
  return (
    <div className="detail-content tramites">
      <Header text="Trámites" back={onBack} />

      <div id="ir-a-mis-turnos">
        <p className="description">Consultá más trámites en <span>TramitAR</span> o sacá un turno en <span>Turnos</span></p>
        <button>
          <p>Ir a mis turnos</p>
        </button>
      </div>

      <div className="tramites-section">
        <div className="header-section">
          <img src={require('../img/luz-y-gas.jpeg')} alt="" />
          <div id="divider"></div>
          <p>Solicitud de subsidios a la luz y gas</p>
        </div>

        <div id="divider-horizontal" className="first"></div>

        <div id="texts">
          <div className="description">Inscribite para mantener los subsidios de luz y de gas que hoy recibis en tu hogar.</div>
        </div>
        <button>
          <p>Ir a la Solicitud</p>
        </button>

        <div id="divider-horizontal"></div>

        <div id="info">
          <img src={require('../img/documentos-info.jpeg')} alt="" />
          <p>para más información ingresá a <span>www.argentina.gob.ar/subsidios</span></p>
        </div>
      </div>

      <div className="tramites-section">
        <div className="header-section">
          <img src={require('../img/acceso.jpeg')} alt="" />
          <div id="divider"></div>
          <p>Solicitá tu Símbolo Internacional de Acceso</p>
        </div>

        <div id="divider-horizontal" className="first"></div>

        <div id="texts">
          <div className="description">Si tenés un CUD o sos representante de una persona con discapacidad* podés tramitar el beneficio de libre tránsito y estacionamiento (derecho regulado por las normativas de tránsito de cada localidad o municipio).</div>
          <div className="description">* Sólo podrá efectuarlo el representante que hubiera realizado el trámite del CUD junto a la persona con discapacidad.</div>
        </div>
        <button>
          <p>Solicitá tu Símbolo</p>
        </button>

        <div id="divider-horizontal" className='end'></div>
      </div>

      <div className="tramites-section">
        <div className="header-section">
          <img src={require('../img/peaje.jpeg')} alt="" />
          <div id="divider"></div>
          <p>Solicitá la exención de pago de peajes para personas con discapacidad.</p>
        </div>

        <div id="divider-horizontal" className="first"></div>

        <div id="texts">
          <div className="description">Vialidad Nacional otorga, a través de las empresas concesionarias, la exención del pago de peajes de rutas nacionales concesionadas para personas con discapacidad.</div>
        </div>
        <button>
          <p>Solicitá tu pase libre</p>
        </button>

        <div id="divider-horizontal"></div>

        <div id="info">
          <img src={require('../img/documentos-info.jpeg')} alt="" />
          <p><span>Conocé más sobre el trámite de exención del pago de peajes para personas con discapacidad</span></p>
        </div>
      </div>
    </div>
  );
};

export default Tramites;
