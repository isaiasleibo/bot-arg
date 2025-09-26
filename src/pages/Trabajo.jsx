import React from 'react';
import Header from '../components/Header';
import '../css/Trabajo.scss';

// Pega la función que te di aquí arriba, o impórtala desde otro archivo
const calcularDigitoCuil = (prefijo, documento) => {
  if (prefijo.length !== 2 || documento.length > 8) return 'X';
  const dniCompleto = documento.padStart(8, '0');
  const base = prefijo + dniCompleto;
  const pesos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let suma = 0;
  for (let i = 0; i < base.length; i++) {
    suma += parseInt(base[i], 10) * pesos[i];
  }
  const resto = suma % 11;
  const digito = 11 - resto;
  if (digito === 11) return 0;
  if (digito === 10) return 9;
  return digito;
};


const Trabajo = ({ onBack, user }) => {
  // 1. Determinamos las partes del CUIL
  const prefijo = user.sexo === 'M' ? '20' : '27';
  const documento = user.documento;
  
  // 2. Calculamos el dígito verificador
  const digitoVerificador = calcularDigitoCuil(prefijo, documento);
  
  // 3. Formateamos el CUIL completo para mostrarlo
  const cuilCompleto = `${prefijo}${documento.padStart(8, '0')}${digitoVerificador}`;

  return (
    <div className="detail-content trabajo">
      <Header text="Trabajo" back={onBack} />

      <div id="constancia-de-cuil">
        <div id="user-info">
          <div className="info">
            <p className="title">Nombre</p>
            <p className="description">{user.nombre}</p>
          </div>
          <div className="info">
            <p className="title">Apellido</p>
            <p className="description">{user.apellido}</p>
          </div>
          <div className="info">
            <p className="title">CUIL</p>
            {/* 4. Mostramos el CUIL calculado y formateado */}
            <p className="description">{cuilCompleto}</p>
          </div>
        </div>

        <button>
          <p>Descargar constancia de CUIL</p>
        </button>

        <div id="divider-horizontal"></div>

        <div id="suministrado-por">
          <p>Datos suministrados por</p>
          <span>ANSES</span>
        </div>

        <div id="divider-horizontal" className='end'></div>
      </div>
    </div>
  );
};

export default Trabajo;