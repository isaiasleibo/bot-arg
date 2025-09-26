import React, { useState, useEffect } from 'react';
import '../css/Register.scss'; // Asegúrate de que la ruta a tu archivo CSS sea correcta

const Register = ({ onBack, onRegisterSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        emailRepeat: '',
        password: '',
        passwordRepeat: '',
        nombre: '',
        apellido: '',
        sexo: '',
        fechaNacimiento: '',
        documento: '',
        domicilio: '',
        nacionalidad: 'Argentina',
        ejemplar: 'A',
        fechaEmision: '',
        fechaVencimiento: '',
        numeroTramite: '',
        lugarNacimiento: 'Argentina'
    });

    const [errors, setErrors] = useState({});
    const [showOptional, setShowOptional] = useState(false);

    // Efecto para generar un número de trámite aleatorio al montar el componente
    useEffect(() => {
        // Genera un número aleatorio de 11 dígitos
        const randomTramite = Math.floor(10000000000 + Math.random() * 90000000000).toString();
        setFormData(prev => ({
            ...prev,
            numeroTramite: randomTramite
        }));
    }, []);

    // Efecto para calcular fechas de emisión y vencimiento basado en la fecha de nacimiento
    useEffect(() => {
        if (formData.fechaNacimiento) {
            const birthDate = new Date(formData.fechaNacimiento);
            if (!isNaN(birthDate.getTime())) {
                const emissionDate = new Date(birthDate);
                emissionDate.setFullYear(birthDate.getFullYear() + 14);

                const expiryDate = new Date(emissionDate);
                expiryDate.setFullYear(emissionDate.getFullYear() + 15);

                // Actualiza el estado solo si las fechas no han sido modificadas manualmente
                // Para evitar sobrescribir la entrada del usuario, comparamos con el valor calculado
                setFormData(prev => ({
                    ...prev,
                    fechaEmision: emissionDate.toISOString().split('T')[0],
                    fechaVencimiento: expiryDate.toISOString().split('T')[0]
                }));
            }
        }
    }, [formData.fechaNacimiento]);


    const handleChange = (e) => {
        let { name, value } = e.target;

        // Validaciones en tiempo real
        switch (name) {
            case 'nombre':
            case 'apellido':
            case 'nacionalidad':
                value = value.replace(/\s/g, '');
                break;
            case 'documento':
                value = value.replace(/[^0-9]/g, '').slice(0, 8);
                break;
            case 'numeroTramite':
                value = value.replace(/[^0-9]/g, '').slice(0, 11);
                break;
            case 'ejemplar':
                value = value.replace(/[^a-zA-Z]/g, '').slice(0, 1).toUpperCase();
                break;
            default:
                break;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'El correo es obligatorio';
        if (formData.email !== formData.emailRepeat) newErrors.emailRepeat = 'Los correos no coinciden';
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        if (formData.password !== formData.passwordRepeat) newErrors.passwordRepeat = 'Las contraseñas no coinciden';
        if (formData.documento.length !== 8) newErrors.documento = 'El documento debe tener 8 dígitos';
        if (formData.numeroTramite.length !== 11) newErrors.numeroTramite = 'El número de trámite debe tener 11 dígitos';
        if (!/^[A-Z]$/.test(formData.ejemplar)) newErrors.ejemplar = 'El ejemplar debe ser una única letra mayúscula';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://localhost:3001/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if (response.ok) {
                    alert('¡Cuenta creada con éxito!');
                    if (onRegisterSuccess) onRegisterSuccess();
                } else {
                    setErrors({ form: data.message || 'Error al crear la cuenta' });
                }
            } catch (err) {
                console.error('Error de red:', err);
                setErrors({ form: 'No se pudo conectar al servidor. Inténtelo más tarde.' });
            }
        }
    };

    return (
        <div className="register">
            <div id="header-register">
                <img id='atras' src={require('../img/atras-white.jpeg')} alt="Atrás" onClick={onBack} />
                <p>Crear cuenta</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-section">
                    <h3>Datos de la cuenta</h3>
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    
                    <label htmlFor="emailRepeat">Repetir correo electrónico</label>
                    <input id="emailRepeat" type="email" name="emailRepeat" value={formData.emailRepeat} onChange={handleChange} required />
                    {errors.emailRepeat && <p className="error-message">{errors.emailRepeat}</p>}
                    
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    {errors.password && <p className="error-message">{errors.password}</p>}

                    <label htmlFor="passwordRepeat">Repetir contraseña</label>
                    <input id="passwordRepeat" type="password" name="passwordRepeat" value={formData.passwordRepeat} onChange={handleChange} required />
                    {errors.passwordRepeat && <p className="error-message">{errors.passwordRepeat}</p>}
                </div>

                <div className="form-section">
                    <h3>Datos personales</h3>
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    
                    <label htmlFor="apellido">Apellido</label>
                    <input id="apellido" type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
                    
                    <label htmlFor="sexo">Sexo</label>
                    <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required>
                        <option value="">Seleccione su sexo</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                    
                    <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                    <input id="fechaNacimiento" type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
                    
                    <label htmlFor="documento">Número de documento (8 dígitos)</label>
                    <input id="documento" type="text" name="documento" inputMode="numeric" value={formData.documento} onChange={handleChange} required />
                    {errors.documento && <p className="error-message">{errors.documento}</p>}
                    
                    <label htmlFor="domicilio">Domicilio</label>
                    <input id="domicilio" type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} required />
                </div>

                <div className="form-section optional-section">
                    <h3 onClick={() => setShowOptional(!showOptional)}>
                        Datos opcionales (se rellenan automáticamente)
                        <span>{showOptional ? '▲' : '▼'}</span>
                    </h3>
                    {showOptional && (
                        <div className="optional-fields">
                            <label htmlFor="nacionalidad">Nacionalidad</label>
                            <input id="nacionalidad" type="text" name="nacionalidad" value={formData.nacionalidad} onChange={handleChange} required />
                            
                            <label htmlFor="ejemplar">Ejemplar (una letra)</label>
                            <input id="ejemplar" type="text" name="ejemplar" value={formData.ejemplar} onChange={handleChange} required />
                            {errors.ejemplar && <p className="error-message">{errors.ejemplar}</p>}
                            
                            <label htmlFor="fechaEmision">Fecha de emisión</label>
                            <input id="fechaEmision" type="date" name="fechaEmision" value={formData.fechaEmision} onChange={handleChange} required />
                            
                            <label htmlFor="fechaVencimiento">Fecha de vencimiento</label>
                            <input id="fechaVencimiento" type="date" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange} required />
                            
                            <label htmlFor="numeroTramite">Número de trámite (11 dígitos)</label>
                            <input id="numeroTramite" type="text" inputMode="numeric" name="numeroTramite" value={formData.numeroTramite} onChange={handleChange} required />
                            {errors.numeroTramite && <p className="error-message">{errors.numeroTramite}</p>}

                            <label htmlFor="lugarNacimiento">Lugar de nacimiento</label>
                            <input id="lugarNacimiento" type="text" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} required />
                        </div>
                    )}
                </div>

                {errors.form && <p className="error-message">{errors.form}</p>}
                <button type="submit">Crear cuenta</button>
            </form>
        </div>
    );
};

export default Register;

