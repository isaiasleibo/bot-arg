import React, { useState } from 'react';
import './css/App.scss';

import Home from './pages/Home';
import Documentos from './pages/Documentos';
import Vehiculos from './pages/Vehiculos';
import Trabajo from './pages/Trabajo';
import Salud from './pages/Salud';
import Cobros from './pages/Cobros';
import Tramites from './pages/Tramites';
import Turnos from './pages/Turnos';
import Hijos from './pages/Hijos';

function App() {
    const [activeView, setActiveView] = useState('Home');
    // Nuevo estado para controlar qué componente de detalle se renderiza.
    // Esto evita que se desmonte inmediatamente al volver a Home.
    const [detailPage, setDetailPage] = useState(null);

    const handleNavigate = (view) => {
        setDetailPage(view); // Establece qué página de detalle mostrar
        setActiveView(view); // Inicia la animación para mostrarla
    };

    const handleBack = () => {
        setActiveView('Home'); // Inicia la animación para volver a home
        // No cambiamos detailPage aquí, para que el componente siga visible durante la animación de salida
    };

    const renderDetailView = () => {
        // Usamos el estado 'detailPage' para decidir qué componente renderizar
        switch (detailPage) {
            case 'Documentos':
                return <Documentos onBack={handleBack} />;
            case 'Vehiculos':
                return <Vehiculos onBack={handleBack} />;
            case 'Trabajo':
                return <Trabajo onBack={handleBack} />;
            case 'Salud':
                return <Salud onBack={handleBack} />;
            case 'Cobros':
                return <Cobros onBack={handleBack} />;
            case 'Tramites':
                return <Tramites onBack={handleBack} />;
            case 'Turnos':
                return <Turnos onBack={handleBack} />;
            case 'Hijos':
                return <Hijos onBack={handleBack} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className={`app-wrapper ${activeView !== 'Home' ? 'show-detail' : 'show-home'}`}>
                <div className="home-page home">
                    <Home onNavigate={handleNavigate} />
                </div>
                <div className="detail-page">
                    {renderDetailView()}
                </div>
            </div>

            <footer>
                <div className="footer-button active">
                    <img src={require('./img/inicio.jpeg')} alt="" />
                    <p>Inicio</p>
                </div>
                <div className="footer-button">
                    <img src={require('./img/novedades.jpeg')} alt="" />
                    <p>Novedades</p>
                </div>
                <div className="footer-button">
                    <img src={require('./img/telefonos.jpeg')} alt="" />
                    <p>Teléfonos</p>
                </div>
                <div className="footer-button">
                    <img src={require('./img/tina.jpeg')} alt="" />
                    <p>Tina</p>
                </div>
            </footer>
        </>
    );
}

export default App;
