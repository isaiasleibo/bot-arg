const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Importar jsonwebtoken

const app = express();
const port = 3001;

// --- INICIO DE CAMBIOS ---
// Es muy importante que esta clave sea secreta y compleja en un entorno de producción
const JWT_SECRET = 'tu_clave_secreta_super_segura_12345'; 
// --- FIN DE CAMBIOS ---

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'Gatacasa!2023',
    database: 'mi_argentina_replica'
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { email, password, emailRepeat, passwordRepeat, ...data } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    try {
        const checkUserSql = 'SELECT id FROM usuarios WHERE usuario = ?';
        db.query(checkUserSql, [email], async (err, results) => {
            if (err) {
                console.error('Error al verificar el usuario:', err);
                return res.status(500).json({ message: 'Error interno del servidor.' });
            }
            if (results.length > 0) {
                return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = JSON.stringify(data);

            const insertSql = 'INSERT INTO usuarios (usuario, contraseña, data) VALUES (?, ?, ?)';
            db.query(insertSql, [email, hashedPassword, userData], (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    return res.status(500).json({ message: 'Error interno del servidor al registrar.' });
                }
                res.status(201).json({ message: 'Usuario registrado con éxito.', userId: result.insertId });
            });
        });
    } catch (error) {
        console.error('Error al hashear la contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});


// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    const sql = 'SELECT * FROM usuarios WHERE usuario = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error al buscar el usuario:', err);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const user = results[0];

        try {
            const match = await bcrypt.compare(password, user.contraseña);
            if (match) {
                // --- INICIO DE CAMBIOS ---
                // Crear el payload para el token
                const payload = { 
                    id: user.id, 
                    email: user.usuario 
                };

                // Firmar el token
                const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // El token expira en 1 hora

                const userData = user.data;
                
                // Enviar token y datos del usuario
                res.status(200).json({ 
                    message: 'Login exitoso', 
                    token: token, // Enviar el token al cliente
                    userData: {
                        id: user.id,
                        email: user.usuario,
                        ...userData
                    } 
                });
                // --- FIN DE CAMBIOS ---
            } else {
                res.status(401).json({ message: 'Credenciales inválidas.' });
            }
        } catch (error) {
            console.error('Error al comparar contraseñas:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    });
});

// --- INICIO DE CAMBIOS ---
// Nuevo endpoint para verificar el token y hacer login automático
app.post('/verify-token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Si el token es válido, buscamos al usuario para devolver sus datos actualizados
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(sql, [decoded.id], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }
            
            const user = results[0];
            const userData = user.data;

            res.status(200).json({
                message: 'Token válido.',
                userData: {
                    id: user.id,
                    email: user.usuario,
                    ...userData
                }
            });
        });
    } catch (err) {
        // Si el token expiró o es inválido
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
});
// --- FIN DE CAMBIOS ---


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
