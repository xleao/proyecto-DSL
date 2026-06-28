require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const helpers = require('./utils/handlebarsHelpers');

const app = express();

// 1. Conexión a Base de Datos
connectDB();

// 2. Configuración i18next (Internacionalización)
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'es',
    preload: ['es', 'en'],
    backend: { loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json') }
  });

app.use(cookieParser());
app.use(middleware.handle(i18next));

// 3. Motor DSL de Vistas (Handlebars)
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: helpers
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
// Requisito 3.a: Caché inteligente habilitado en producción
app.set('view cache', process.env.NODE_ENV === 'production');

// 4. Middlewares de Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir CSS/JS estáticos

// 5. Inyección de rutas
app.use('/', routes);

// 6. Arranque
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 NeuraCore AI Server ejecutándose en http://localhost:${PORT}`);
    console.log(`🛠️  Entorno: ${process.env.NODE_ENV}`);
});
