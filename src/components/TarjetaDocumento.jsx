import React, { useState, useRef, useEffect } from 'react';
import '../css/TarjetaDocumento.scss';

// --- Componente para generar el código de barras ---
// Utiliza la librería bwip-js para dibujar el código en un canvas.
const PDF417Barcode = ({ text }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.bwipjs && canvasRef.current) {
      try {
        const options = {
          bcid: 'pdf417',
          text: text,
          scale: 2,
          height: 10,
          includetext: false,
          textxalign: 'center',
          columns: 8,
        };
        window.bwipjs.toCanvas(canvasRef.current, options);
      } catch (e) {
        console.error("Error al generar el código de barras:", e);
      }
    }
  }, [text]);

  return <canvas ref={canvasRef} />;
};
// --- Fin del componente de código de barras ---

// --- Funciones de ayuda para formatear datos ---

// Formatea las fechas al estilo "DD MMM / MMM YYYY" (ej: 09 MAY / MAY 2007)
// --- Función para calcular el dígito de control ---
const calculateCheckDigit = (data) => {
  if (!data || typeof data !== 'string') return 'P';

  const weights = [7, 3, 1];
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const char = data.charAt(i);
    // Para este caso, solo necesitamos manejar números.
    const value = parseInt(char, 10); 
    
    if (!isNaN(value)) {
      sum += value * weights[i % 3];
    }
  }
  return sum % 10;
};

const formatDateToDNI = (dateString) => {
  if (!dateString) return 'P';
  const months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  const date = new Date(dateString + 'T00:00:00'); // Añadir T00:00:00 para evitar problemas de zona horaria
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} / ${month} ${year}`;
};

// Formatea las fechas al estilo "DD/MM/YYYY" para el código de barras
const formatDateToBarcode = (dateString) => {
    if (!dateString) return 'P';
    const date = new Date(dateString + 'T00:00:00');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Genera las líneas de la Zona de Lectura Mecánica (MRZ)
// Genera las líneas de la Zona de Lectura Mecánica (MRZ)
const generateMRZ = (user) => {
    const format = (str, len) => (str || '').toUpperCase().replace(/ /g, '<').padEnd(len, '<');
    
    // --- Datos y sus dígitos de control ---
    const docNumber = user.documento || '';
    const docCheckDigit = calculateCheckDigit(docNumber);

    const dob = user.fechaNacimiento ? user.fechaNacimiento.substring(2).replace(/-/g, '') : '';
    const dobCheckDigit = calculateCheckDigit(dob);

    const expiry = user.fechaVencimiento ? user.fechaVencimiento.substring(2).replace(/-/g, '') : '';
    const expiryCheckDigit = calculateCheckDigit(expiry);
    
    const nationality = (user.nacionalidad || 'P').substring(0,3).toUpperCase();

    // --- Cálculo del dígito de control general ---
    const overallData = `${docNumber}${docCheckDigit}${dob}${dobCheckDigit}${expiry}${expiryCheckDigit}`;
    const overallCheckDigit = calculateCheckDigit(overallData);

    // --- Construcción de las líneas ---
    const line1 = format(`IDARG${docNumber}<${docCheckDigit}`, 30);
    
    let line2Part = `${dob}${dobCheckDigit}${user.sexo || 'P'}${expiry}${expiryCheckDigit}${nationality}`;
    line2Part = line2Part.padEnd(29, '<');
    const line2 = `${line2Part}${overallCheckDigit}`;
    
    const line3 = format(`${user.apellido || 'P'}<${user.nombre || 'P'}`, 30);

    return [line1, line2, line3];
}


const renderSpans = (line) => {
  return line.split("").map((char, index) => (
    <span key={index}>{char}</span>
  ));
};

const TarjetaDocumento = ({ onFlip, user }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Efecto para cargar dinámicamente el script de la librería bwip-js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/bwip-js@4.3.0/dist/bwip-js-min.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const updateWidth = () => {
      const width = el.offsetWidth;
      el.style.setProperty('--card-size-ref', `${width * 0.2}px`);
    };
    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip();
  };
  
  // Si el objeto user no está disponible, no renderizar nada o mostrar un loader.
  if (!user) {
    return <p>Cargando datos del usuario...</p>;
  }

  // --- Datos para el código de barras (ahora dinámicos) ---
  const barcodeData = [
    (user.numeroTramite || 'P').substring(0, 9), // Se trunca a 9 para simular el formato original
    user.apellido || 'P',
    user.nombre || 'P',
    user.sexo || 'P',
    user.documento || 'P',
    user.ejemplar || 'P',
    formatDateToBarcode(user.fechaNacimiento),
    formatDateToBarcode(user.fechaEmision)
  ].join('@');
  
  const mrzLines = generateMRZ(user);

  return (
    <div
      className="card-perspective"
      onClick={handleFlip}
      title="Haz clic para girar"
      ref={cardRef}
    >
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-face card-front">
          <img src={require('../img/anverso.png')} alt="" />
          {/* Usamos el operador OR (||) para poner 'P' si el dato no existe */}
          <p id="documento">{(user.documento || 'P').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
          <p id="apellido">{(user.apellido || 'P').toUpperCase()}</p>
          <p id="nombre">{(user.nombre || 'P').charAt(0).toUpperCase() + (user.nombre || 'p').slice(1).toLowerCase()}</p>
          <p id="sexo">{user.sexo || 'P'}</p>
          <p id="nacionalidad">{(user.nacionalidad || 'P').toUpperCase()}</p>
          <p id="ejemplar">{user.ejemplar || 'P'}</p>
          <p id="fecha-de-nacimiento">{formatDateToDNI(user.fechaNacimiento)}</p>
          <p id="fecha-de-emision">{formatDateToDNI(user.fechaEmision)}</p>
          <p id="fecha-de-vencimiento">{formatDateToDNI(user.fechaVencimiento)}</p>
          <p id="numero-de-tramite">{user.numeroTramite || 'P'}</p>
          <div id='pdf147'>
            {isScriptLoaded ? (
              <PDF417Barcode text={barcodeData} />
            ) : (
              <p>Cargando código...</p>
            )}
          </div>
        </div>
        <div className="card-face card-back">
          <img src={require('../img/reverso.png')} alt="" />
          <p id="domicilio">{(user.domicilio || 'P').toUpperCase()}</p>
          <p id="lugar-de-nacimiento">{(user.nacionalidad || 'P').toUpperCase()}</p>
          <div id="barcode">
            <p>{renderSpans(mrzLines[0])}</p>
            <p>{renderSpans(mrzLines[1])}</p>
            <p>{renderSpans(mrzLines[2])}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TarjetaDocumento;