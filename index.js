//Crear servidor
require('dotenv').config()
const express = require('express')
const routerMotogp = require('./src/routes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const passportConfig = require('./config/passport');
const sequelize = require('./config/sequelize');
const methodOverride = require('method-override');
const Moto = require('./src/models/motoModel');
const Piloto = require('./src/models/pilotoModel');
const MotoPiloto = require('./src/models/MotoPiloto'); // Asume que tienes un modelo para la tabla intermedia

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
//Middleware para manejar cookies y sesiones
app.use(cookieParser());
app.use(session({
    secret: 'KMDsina09ujdDCJkajsd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true si usas HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.user; // Asegúrate de que `req.user` contiene la información del usuario
    next();
});


app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(expressLayouts);
app.set('layout', 'layouts/base');

//Configuración de passport
passportConfig(app);

// Función para iniciar la aplicación y sincronizar modelos
async function iniciarAplicacion() {
    try {
        // Sincroniza los modelos en el orden adecuado
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');

        await Moto.sync(); // Sincroniza la tabla motos
        await Piloto.sync(); // Sincroniza la tabla pilotos
        await MotoPiloto.sync(); // Sincroniza la tabla intermedia moto_pilotos

        console.log('Modelos sincronizados correctamente.');

        // Continúa con otras operaciones de tu aplicación como iniciar el servidor web
        app.listen(PORT, () => {
            console.log('Listening on port: ' + PORT);
        });

    } catch (error) {
        console.error('Error al sincronizar modelos:', error);
    }
}

// Llama a la función para iniciar la aplicación
iniciarAplicacion();

//Rutas
routerMotogp(app)
