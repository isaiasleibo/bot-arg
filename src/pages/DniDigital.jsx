import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/DniDigital.scss';
import TarjetaDocumento from '../components/TarjetaDocumento';

const DniDigital = ({ onBack, user }) => {
  // Estado para saber si la tarjeta está girada o no
  const [isFlipped, setIsFlipped] = useState(false);

  // Función para cambiar el estado de la tarjeta
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const today = new Date();

  // Función para formatear con ceros a la izquierda
  const formatNumber = (num) => String(num).padStart(2, "0");

  const day = formatNumber(today.getDate());
  const month = formatNumber(today.getMonth() + 1); // recuerda que los meses son 0-11
  const year = today.getFullYear();
  const hours = formatNumber(today.getHours());
  const minutes = formatNumber(today.getMinutes());

  return (
    <div className="detail-content dni-digital">
      <Header text="DNI Digital" back={onBack} />

      <div className="dni-content-placeholder">
        <div id="main-section">
          <p id="nombre-completo">Isaias Leibovich</p>
          {/* Pasamos el estado y la función para girar la tarjeta */}
          <TarjetaDocumento user={user} isFlipped={isFlipped} onFlip={handleFlip} />

          <div id="dots">
            <div className={`dot${!isFlipped ? ' active' : ''}`}></div>
            <div className={`dot${isFlipped ? ' active' : ''}`}></div>
          </div>

          <p id="last-update">
            Última actualización {day}/{month}/{year} {hours}:{minutes} hs
          </p>
        </div>

        <div id="divider-horizontal"></div>

        <div id='detail-and-deactivate'>
          <div className="button">
            <img src={require('../img/ver-detalle.jpeg')} alt="" />
            <p>Ver detalle</p>
          </div>
          <div id="divider"></div>
          <div className="button">
            <img src={require('../img/desactivar-dni.jpeg')} alt="" />
            <p>Desactivar DNI</p>
          </div>
        </div>

        <div id="divider-horizontal">
        </div>

        <div id="qr-code">
          <div>
            <img src={require('../img/codigo-qr.jpeg')} alt="" />
            <p>Verifica código QR</p>
          </div>

          <img id='arrow' src={require('../img/arrow-down.jpeg')} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DniDigital;
