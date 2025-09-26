import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/Documentos.scss'

const Documentos = ({ onBack, onNavigateToDni }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);

  const handleToggle = () => {
    if (isThrottled) {
      return;
    }
    setIsThrottled(true);
    setIsOpen(!isOpen);

    setTimeout(() => {
      setIsThrottled(false);
    }, 200);
  };

  return (
    <div className="detail-content documentos">
      <Header text="Documentos" back={onBack} />

      <div id='dni-container'>
        <div id="always-shown-section" onClick={handleToggle}>
          <div id="main-objects">
            <img id='dni-img' src={require('../img/documento.jpeg')} alt="" />
            <div id="divider"></div>
            <p>Documento Nacional de Identidad (DNI)</p>
          </div>
          <img id='arrow' className={isOpen ? 'rotated' : ''} src={require('../img/arrow-down.jpeg')} alt="toggle section" />
        </div>

        <div id="hidden-section" className={isOpen ? 'visible' : ''}>
          <div id="divider-horizontal"></div>

          <button id='show-dni' onClick={() => onNavigateToDni('DniDigital')}>
            <p>Ver DNI digital</p>
          </button>

          <div id="divider-horizontal"></div>

          <div id="suministrado-por">
            <p>Datos suministrados por</p>
            <span>RENAPER</span>
          </div>

          <div id="divider-horizontal"></div>

          <div id="solicitar-dni">
            <p>Recordá que podés solicitar el DNI para vos y para tus hijos y tenerlo disponible en la App.</p>
            <button>
              <p>Solicitar DNI Digital</p>
            </button>
          </div>

          <div id="divider-horizontal"></div>

          <div id="documentos-info">
            <img src={require('../img/documentos-info.jpeg')} alt="" />
            <p>Cambié o voy a cambiar el dispositivo</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentos;

