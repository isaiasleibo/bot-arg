import React, { useState, useEffect, useRef } from 'react';
import './css/App.scss';

// --- Componentes de la App principal ---
import Home from './pages/Home';
import Documentos from './pages/Documentos';
import Vehiculos from './pages/Vehiculos';
import Trabajo from './pages/Trabajo';
import Salud from './pages/Salud';
import Cobros from './pages/Cobros';
import Tramites from './pages/Tramites';
import Turnos from './pages/Turnos';
import Hijos from './pages/Hijos';
import Novedades from './pages/Novedades';
import Telefonos from './pages/Telefonos';
import DniDigital from './pages/DniDigital';

// --- Nuevos Componentes para el flujo de Login ---
import PreLogin from './pages/PreLogin';
import Login from './pages/Login';
import Register from './pages/Register';

const FooterButton = ({ pageName, label, currentPage, handleFooterNav, iconName }) => {
    const isActive = currentPage === pageName;
    try {
        const inactiveSrc = require(`./img/${iconName}.jpeg`);
        const activeSrc = require(`./img/${iconName}-active.jpeg`);

        return (
            <div className={`footer-button ${isActive ? 'active' : ''}`} onClick={() => handleFooterNav(pageName)}>
                <div className="image-container">
                    <img className="inactive-icon" src={inactiveSrc} alt={label} />
                    <img className="active-icon" src={activeSrc} alt={label} />
                </div>
                <p>{label}</p>
            </div>
        );
    } catch (error) {
        console.error(`Error al cargar la imagen del ícono: ${iconName}`, error);
        return null;
    }
};

function App() {
    const [detailPage, setDetailPage] = useState(null);
    const [subDetailPage, setSubDetailPage] = useState(null);
    const [currentPage, setCurrentPage] = useState('Home');
    const [animationClass, setAnimationClass] = useState('show-home');
    const timeoutRef = useRef(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authFlowPage, setAuthFlowPage] = useState('prelogin');
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    // --- INICIO DE CAMBIOS ---
    // Efecto para verificar el token y hacer login automático al cargar la app
    useEffect(() => {
        const verifyToken = async (token) => {
            try {
                const response = await fetch('http://localhost:3001/verify-token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Inicio de sesión automático exitoso con token');
                    handleLoginSuccess(data.userData);
                } else {
                    console.error('Token guardado no válido.');
                    localStorage.removeItem('authToken');
                }
            } catch (err) {
                console.error('Error de red durante la verificación del token:', err);
            }
        };

        const savedToken = localStorage.getItem('authToken');

        if (savedToken) {
            verifyToken(savedToken);
        }
    }, []); // El array vacío [] asegura que este efecto se ejecute solo una vez
    // --- FIN DE CAMBIOS ---

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    useEffect(() => {
        if (justLoggedIn) {
            const timer = setTimeout(() => setJustLoggedIn(false), 50);
            return () => clearTimeout(timer);
        }
    }, [justLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) return;
        if (timeoutRef.current) return;

        if (subDetailPage) {
            setAnimationClass('show-sub-detail');
        } else if (detailPage) {
            setAnimationClass('show-detail');
        } else {
            setAnimationClass('show-home');
        }
    }, [detailPage, subDetailPage, isLoggedIn]);

    const handleNavigate = (view) => setDetailPage(view);
    const handleSubNavigate = (view) => setSubDetailPage(view);

    const handleBack = () => {
        clearTimeout(timeoutRef.current);

        if (subDetailPage) {
            setAnimationClass('show-detail');
            timeoutRef.current = setTimeout(() => {
                setSubDetailPage(null);
                timeoutRef.current = null;
            }, 400);
        } else if (detailPage) {
            setAnimationClass('show-home');
            timeoutRef.current = setTimeout(() => {
                setDetailPage(null);
                timeoutRef.current = null;
            }, 400);
        }
    };

    const handleFooterNav = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            if (page === 'Home') {
                clearTimeout(timeoutRef.current);
                setAnimationClass('show-home');
                timeoutRef.current = setTimeout(() => {
                    setDetailPage(null);
                    setSubDetailPage(null);
                    timeoutRef.current = null;
                }, 400);
            }
        }
    };

    const handleNavigateToLogin = () => setAuthFlowPage('login');
    const handleNavigateToRegister = () => setAuthFlowPage('register');
    const handleBackToPreLogin = () => setAuthFlowPage('prelogin');
    const handleBackToLogin = () => setAuthFlowPage('login');

    const handleLoginSuccess = (userData) => {
        console.log('Login exitoso, datos del usuario:', userData);
        setIsLoggedIn(true);
        setJustLoggedIn(true);
        setUserData(userData);
    };

    const renderDetailView = () => {
        switch (detailPage) {
            case 'Documentos':
                return <Documentos onBack={handleBack} onNavigateToDni={handleSubNavigate} />;
            case 'Vehiculos':
                return <Vehiculos onBack={handleBack} />;
            case 'Trabajo':
                return <Trabajo user={userData} onBack={handleBack} />;
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
    
    const renderSubDetailView = () => {
        switch (subDetailPage) {
            case 'DniDigital':
                return <DniDigital onBack={handleBack} user={userData} />;
            default:
                return null;
        }
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'Novedades':
                return <Novedades />;
            case 'Telefonos':
                return <Telefonos />;
            case 'Home':
            default:
                const transitionClass = justLoggedIn ? 'no-transition' : '';
                return (
                    <div className={`app-wrapper ${animationClass} ${transitionClass}`}>
                        <div className="home-page home">
                            <Home user={userData} onNavigate={handleNavigate} />
                        </div>
                        <div className="detail-page">
                            {renderDetailView()}
                        </div>
                        <div className="sub-detail-page">
                            {renderSubDetailView()}
                        </div>
                    </div>
                );
        }
    };

    if (!isLoggedIn) {
        let authAnimationClass = 'show-home';
        if (authFlowPage === 'login') {
            authAnimationClass = 'show-detail';
        } else if (authFlowPage === 'register') {
            authAnimationClass = 'show-sub-detail';
        }

        return (
            <div className={`app-wrapper ${authAnimationClass}`}>
                <div className="home-page prelogin-home-page">
                    <PreLogin onNavigateToLogin={handleNavigateToLogin} onNavigateToRegister={handleNavigateToRegister} />
                </div>
                <div className="detail-page">
                    <Login onBack={handleBackToPreLogin} onLoginSuccess={handleLoginSuccess} onNavigateToRegister={handleNavigateToRegister}/>
                </div>
                 <div className="sub-detail-page">
                    <Register onBack={handleBackToLogin} onRegisterSuccess={handleNavigateToLogin} />
                </div>
            </div>
        );
    }
    
    return (
        <>
            {renderCurrentPage()}
            <footer>
                <FooterButton pageName="Home" label="Inicio" iconName="inicio" currentPage={currentPage} handleFooterNav={handleFooterNav} />
                <FooterButton pageName="Novedades" label="Novedades" iconName="novedades" currentPage={currentPage} handleFooterNav={handleFooterNav} />
                <FooterButton pageName="Telefonos" label="Teléfonos" iconName="telefonos" currentPage={currentPage} handleFooterNav={handleFooterNav} />
                <div className="footer-button">
                    <div className="image-container">
                        <img src={require('./img/tina.jpeg')} alt="Tina" />
                    </div>
                    <p>Tina</p>
                </div>
            </footer>
        </>
    );
}

export default App;
