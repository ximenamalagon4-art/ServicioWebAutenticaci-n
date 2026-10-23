
// Importamos Express para crear nuestro servicio web.
const express = require("express");

// Creamos la aplicación del servidor.
const app = express();

// Permitimos que la API reciba datos en formato JSON.
app.use(express.json());

// Definimos el puerto donde funcionará el servicio.
const PORT = 3000;


// Lista temporal para almacenar los usuarios registrados.
// Los datos se perderán cuando se reinicie el servidor.
const usuarios = [];

// Ruta para registrar un usuario nuevo.
app.post("/registro", (req, res) => {
    // Extraemos el usuario y la contraseña enviados.
    const { usuario, contrasena } = req.body;

    // Comprobamos que ambos campos estén presentes.
    if (!usuario || !contrasena) {
        return res.status(400).json({
            mensaje: "El usuario y la contraseña son obligatorios"
        });
    }

    // Verificamos que el usuario no esté registrado.
    const existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        return res.status(409).json({
            mensaje: "El usuario ya está registrado"
        });
    }

    // Guardamos el nuevo usuario.
    usuarios.push({ usuario, contrasena });

    // Respondemos que el registro fue exitoso.
    res.status(201).json({
        mensaje: "Usuario registrado correctamente"
    });
});


 // Ruta para iniciar sesión.
app.post("/login", (req, res) => {
    // Obtenemos el usuario y la contraseña enviados.
    const { usuario, contrasena } = req.body;

    // Comprobamos que los campos estén completos.
    if (!usuario || !contrasena) {
        return res.status(400).json({
            mensaje: "El usuario y la contraseña son obligatorios"
        });
    }

     // Buscamos al usuario y verificamos su contraseña.
    const encontrado = usuarios.find(
        u => u.usuario === usuario && u.contrasena === contrasena
    );

    // Si los datos no coinciden, rechazamos el inicio de sesión.
    if (!encontrado) {
        return res.status(401).json({
            mensaje: "Usuario o contraseña incorrectos"
        });
    }

    // Si los datos coinciden, confirmamos el inicio de sesión.
    res.status(200).json({
        mensaje: "Inicio de sesión exitoso"
    });
});



// Ruta inicial para comprobar que la API funciona.
app.get("/", (req, res) => {
    res.json({
        mensaje: "Servicio web de autenticación funcionando correctamente"
    });
});

// Iniciamos el servidor y mostramos un mensaje en la terminal.
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
