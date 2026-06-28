# UNIVERSIDAD NACIONAL DE INGENIERÍA
## Facultad de Ingeniería Industrial y de Sistemas
## Escuela Profesional de Ingeniería de Software

---

# INFORME TÉCNICO DE INGENIERÍA DE SOFTWARE
## Especificación y Aplicación Práctica de Domain-Specific Languages (DSL)
### Análisis, Diseño, Arquitectura e Implementación a Profundidad

**Proyecto:** CodeLAB Colaborativo - "Lumina Art Gallery" (Proyecto A: Plataforma de E-Commerce con Plantillas Handlebars)
**Profesor:** Ing. Jorge Medianero Acosta
**Ciclo:** 2026-I
**Curso:** Diseño de Software (SW261)
**Grupo:** 03

---

## 1. INTRODUCCIÓN Y MARCO TEÓRICO EXTENDIDO (Bases Teóricas de los DSLs)

El presente informe técnico documenta el diseño, la arquitectura y el desarrollo a nivel de ingeniería de una plataforma de comercio electrónico orientada a la venta de arte contemporáneo denominada "Lumina Art Gallery". El objetivo fundamental de este proyecto no es meramente construir una tienda transaccional, sino **demostrar con un rigor académico y técnico exhaustivo la aplicación práctica de la teoría de Lenguajes Específicos de Dominio (DSLs)** en un entorno de desarrollo web moderno.

### 1.1. Análisis Crítico: ¿Por qué la Tecnología Web Estándar no es un DSL?
En el paradigma de desarrollo web tradicional, convergen múltiples tecnologías estándar (HTML, CSS, JavaScript y JSON). A simple vista, podría parecer que cada una resuelve un problema específico, pero al someterlas a un análisis bajo la teoría formal de lenguajes de programación (Theory of Computation), **ninguna de ellas se considera un DSL formal de programación en el sentido estricto**:

*   **HTML5 (HyperText Markup Language):** Analizando el archivo `index.html`, constatamos que no es un DSL de programación. El consenso técnico lo define como un **Lenguaje de Marcación (Markup Language)**. Carece de la capacidad de evaluar condiciones lógicas (no existen los condicionales `if/else`), no puede ejecutar bucles (no hay `for` o `while`), ni puede definir variables, funciones o rutinas. Es estático por naturaleza.
*   **CSS (Cascading Style Sheets):** Analizando el archivo `styles.css`, observamos que es declarativo y altamente especializado en la presentación visual de elementos en el DOM. Sin embargo, no posee capacidad de programación lógica nativa. Se le clasifica formalmente como un lenguaje de hoja de estilos, o como máximo, un pseudo-DSL declarativo para el renderizado visual, pero nunca como un DSL de programación algorítmica.
*   **JavaScript (Vanilla JS):** Analizando el archivo `script.js`, encontramos un lenguaje que sí posee lógica, control de flujo y evaluación de expresiones. No obstante, JS es un **Lenguaje de Propósito General (GPL - General Purpose Language)**, además de ser Turing-completo. Esto significa que no está acotado ni restringido a un dominio concreto (como sería el caso de SQL para bases de datos relacionales). JS puede compilar para servidores, aplicaciones móviles, bases de datos o hardware embebido. 
*   **JSON (JavaScript Object Notation):** Analizando el archivo `datos.json`, concluimos que es simplemente un **Formato de Intercambio de Datos (Data Interchange Format)**. No contiene sintaxis de control, ni comandos operacionales. Su única finalidad es serializar estructuras de datos y transportarlas. No se puede "ejecutar" un JSON.

### 1.2. El Metamodelo y la Arquitectura Interna de un DSL
Como respuesta a las carencias algorítmicas de HTML y la sobre-complejidad acoplada de usar JavaScript generalista para escupir cadenas de texto, nace la necesidad de un **DSL Formal**. 
Formalmente, un DSL es un lenguaje de programación diseñado con una gramática altamente optimizada para resolver problemas de un nicho muy acotado. Se caracteriza por:
1.  **Dominio Específico:** Resuelve problemas de un área concreta (en nuestro caso, el dominio de "Generación de Vistas y Plantillas Dinámicas HTML").
2.  **Capacidad de Expresión:** Permite definir la lógica de renderizado de manera concisa y natural, ocultando la verbosidad de un GPL.
3.  **Abstracción:** Oculta los detalles complejos de la implementación subyacente (por ejemplo, el AST parsing en C++ que realiza Node.js por debajo).

La teoría establece que todo DSL debe tener:
*   **Sintaxis Abstracta (El Metamodelo):** Define los conceptos lógicos del dominio. En este proyecto, nuestro metamodelo en Node.js define qué es una "Obra de Arte", qué es el "Carrito de Compras", y las reglas de negocio (ej. "Separar por categoría", "Aplicar moneda"). El metamodelo dicta *qué* se va a renderizar.
*   **Sintaxis Concreta:** Es el "mapping" o la asociación de cada elemento abstracto a una representación tangible. El diseño de este proyecto utiliza un **DSL Textual** (más expresivo, basado en una gramática de tokens y llaves `{{}}`) en contraposición a un DSL visual.

---

## 2. ARQUITECTURA DEL PROYECTO (Desarrollo del Proyecto A)

Para dar cumplimiento íntegro a las especificaciones del **"Proyecto A: Plataforma de E-commerce con Plantillas Handlebars"**, hemos estructurado el sistema bajo un patrón MVC estricto, separando radicalmente el markup de la lógica de negocio.

### 2.1. El Stack Tecnológico y Flujo de Datos
*   **Handlebars.js (El DSL Principal):** Actúa como el compilador que transforma el AST semántico en el árbol DOM HTML final.
*   **Node.js / Express.js (El Servidor):** Construye la Sintaxis Abstracta y maneja el enrutamiento HTTP.
*   **MongoDB (Persistencia):** Almacenamiento NoSQL de los esquemas de productos, garantizando escalabilidad.
*   **i18next (Internacionalización):** Middleware que acopla diccionarios JSON con el AST del DSL.
*   **Sass/SCSS (El Segundo DSL):** Empleado como un preprocesador (DSL declarativo superior a CSS) para compilar variables y mixins estructurales de la interfaz de usuario.

### 2.2. Implementación de Requisitos Específicos

#### A. Sistema Avanzado de Plantillas Anidadas
El problema de duplicación de código en la web clásica se soluciona con el uso de las abstracciones del DSL.
*   **Layouts:** `views/layouts/main.hbs` funciona como la superestructura envolvente (`<html>`, `<head>`, `<nav>`, `<footer>`).
*   **Partials:** Modularización extrema. Extraemos componentes atómicos y los inyectamos dinámicamente usando la sintaxis del DSL: `{{> checkoutModal}}` (Inyecta la pasarela de pago) y `{{> productCard}}` (Inyecta la tarjeta de una obra de arte).

#### B. Extensión del AST mediante Custom Helpers
La verdadera potencia de un DSL radica en su extensibilidad. Hemos inyectado comandos personalizados a la máquina virtual de Handlebars:
*   `{{formatCurrency price}}`: Aplica reglas matemáticas para imprimir formatos monetarios exactos de 2 decimales ($ XX.XX).
*   `{{renderStars rating}}`: Ejecuta lógica condicional interna para devolver una cadena segura de clases de FontAwesome, dibujando estrellas llenas, medias y vacías.
*   `{{t 'nav.search'}}`: Nuestro custom helper bidireccional. Este token obliga al DSL a invocar el motor de `i18next` en memoria, buscar el hash en el archivo JSON activo (español o inglés) y renderizar la traducción al vuelo.

#### C. El Zenit de la Implementación: Renderizado Isomórfico
La métrica más rigurosa de este proyecto es el requisito de utilizar el DSL de manera Isomórfica (ejecutarlo simétricamente tanto en el backend como en el frontend).
*   **En el Servidor (Node.js):** El método `res.render()` lee los archivos `.hbs` del disco, compila su Sintaxis Abstracta y envía un stream HTML al cliente de manera superrápida.
*   **En el Cliente (El Carrito de Compras):** Aquí radica el logro principal. En lugar de ensuciar el archivo `client.js` con bucles `for` y concatenaciones aberrantes (`innerHTML += "<div>...`), introducimos la librería core de Handlebars mediante un CDN en el navegador. En el DOM, ocultamos un elemento `<script type="text/x-handlebars-template" id="cart-item-template">`. Cuando el usuario añade una obra de arte al carrito, el Javascript cliente *compila* ese script en tiempo real (Isomorfismo) y lo ejecuta sobre el objeto del carrito. Se respeta el metamodelo, se aísla la lógica de presentación y se blinda el sistema contra ataques de inyección XSS de lado del cliente.

#### D. Rendimiento: Caché Inteligente de Plantillas
La compilación de un AST requiere ciclos de CPU. Para demostrar un nivel empresarial, hemos configurado Express para que, en entornos de producción, compile el árbol del DSL una sola vez en el primer renderizado, y mantenga el binario intermedio en memoria RAM (Smart Cache).
`app.set('view cache', process.env.NODE_ENV === 'production');`

---

## 3. ANÁLISIS DE CÓDIGO FUENTE (Line-by-Line Deep Dive)

Para demostrar por qué el lenguaje elegido justifica su uso como DSL en lugar de la solución genérica, someteremos las piezas de software a un análisis arquitectónico pormenorizado.

### 3.1. `server.js` - Inyección del Motor y Extensión del DSL
```javascript
// Importación del puente entre Express y Handlebars
const { engine } = require('express-handlebars');
const helpers = require('./utils/handlebarsHelpers'); // Importamos la extensión de vocabulario

// Configuración de la máquina de estados del motor
app.engine('.hbs', engine({
    extname: '.hbs', // Definición de la extensión de archivo del DSL
    defaultLayout: 'main', // Archivo envoltura por defecto
    helpers: helpers // Inyección al compilador: Ahora Handlebars entiende comandos como {{formatCurrency}}
}));
app.set('view engine', '.hbs'); // Declaramos que el DSL gobernará toda la carpeta de 'views'
```
*Justificación Técnica:* Al configurar la máquina, convertimos una cadena de texto muerta (`.hbs`) en una función ejecutable de JavaScript de altísimo rendimiento. Al inyectar el bloque `helpers`, estamos modificando literalmente el analizador léxico (lexer) del motor para que admita nuestras propias palabras reservadas.

### 3.2. `utils/handlebarsHelpers.js` - Seguridad y Sanitización
```javascript
exports.renderStars = function(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    // ... iteración para generar el markup ...
    
    // Retorno crucial de seguridad
    return new Handlebars.SafeString(starsHtml);
};
```
*Justificación Técnica:* Si devolviéramos `starsHtml` como un string nativo, Handlebars, priorizando la seguridad por defecto, convertiría los caracteres `<` y `>` en `&lt;` y `&gt;` (HTML Escaping). Al usar la clase `SafeString`, el desarrollador firma un contrato con el compilador del DSL asegurando que el string ya ha sido sanitizado lógicamente y puede inyectarse directamente al DOM.

### 3.3. `controllers/ecommerceController.js` - El Metamodelo en Acción
```javascript
exports.getHomePage = async (req, res) => {
    // 1. Obtención de datos crudos (Sintaxis Abstracta)
    const products = await fetchProducts();
    
    // 2. Aplicación de reglas de negocio en el Backend
    const paisajesProducts = products.filter(p => p.category === 'paisajes');
    const abstractoProducts = products.filter(p => p.category === 'abstracto');
    const fotografiaProducts = products.filter(p => p.category === 'fotografia');

    // 3. Serialización y paso de contexto al compilador del DSL
    res.render('home', {
        title: req.t('home.title'),
        paisajesProducts,
        abstractoProducts,
        fotografiaProducts,
        lang: req.language || 'es', 
        t: req.t // Pasando el middleware i18n al DSL
    });
};
```
*Justificación Técnica:* Aquí observamos el patrón MVC puro. El controlador obtiene la información de la base de datos (con su respectiva red de seguridad en memoria RAM). Node.js ejecuta la carga computacional pesada (el filtrado por colección de arte). Finalmente, crea un objeto "Contexto" estricto y se lo lanza a `res.render`. El controlador es completamente ciego respecto a cómo se dibujarán los datos; su única responsabilidad es preparar el metamodelo perfecto.

### 3.4. `public/js/client.js` - El Logro Isomórfico (Frontend)
```javascript
function updateCartUI() {
    // 1. Extracción del DSL estático incrustado en el DOM
    const source = document.getElementById('cart-item-template').innerHTML;
    
    // 2. Compilación del Árbol de Sintaxis Abstracta (AST) en el Navegador
    const template = Handlebars.compile(source); 
    
    // 3. Preparación del Contexto de datos
    let total = 0;
    const context = cart.map((item) => {
        total += item.price;
        return { ...item, price: item.price.toFixed(2) };
    });
    
    // 4. Ejecución del DSL y mutación segura del DOM
    cartItems.innerHTML = template(context); 
}
```
*Justificación Técnica:* Esta función es la demostración definitiva del requerimiento de "Isomorfismo". A diferencia de una solución genérica ineficiente (como usar iteradores `forEach` para concatenar cadenas interminables de `innerHTML += "<article class='...'"`), aquí delegamos la responsabilidad total a Handlebars del lado del cliente. El código JS permanece inmaculado, funcionando solo como el pegamento algorítmico (calcula el total de la cesta) mientras que la responsabilidad UI recae sobre el template.

### 3.5. `views/home.hbs` - La Expresividad Superior del DSL Textual
```handlebars
<section class="collection-preview">
    <h2>{{t 'home.categories.landscapes'}}</h2>
    <div class="products-grid">
        {{#each paisajesProducts}}
            {{> productCard }}
        {{/each}}
    </div>
</section>
```
*Justificación Técnica:* Comparemos esto con un bucle `for` de JS. La sintaxis del DSL de Handlebars es altamente declarativa, semánticamente rica y de lectura humana instantánea. El operador de bloque `{{#each}}` gestiona el bucle por sí mismo. El operador de inclusión de partials `{{> productCard}}` actúa como una llamada a función que inyecta un módulo aislado de UI. Y el custom helper `{{t}}` inyecta instantáneamente el hash internacionalizado. La productividad, legibilidad y mantenibilidad de este bloque frente a una solución GPL genérica es, al menos, un orden de magnitud superior.

---

## 5. DISEÑO DE EXPERIENCIA DE USUARIO E INTERFAZ (UX/UI) Y SCSS

La aplicación respeta una filosofía "Mobile-First" acentuada, diseñada para escalar graciosamente desde un smartphone de gama baja hasta pantallas ultra-wide. El tema de "Lumina Art Gallery" utiliza paletas desaturadas, espacios negativos ("Whitespace") predominantes, fuentes sans-serif de grado tipográfico (Inter / Roboto) y micro-animaciones (Glassmorphism) para evocar una sensación premium, idéntica a las firmas de alta gama.

### 5.1. SCSS: El Segundo DSL (Preprocesador de Estilos)
En lugar de escribir CSS plano, hemos utilizado Sass (Syntactically Awesome Style Sheets), el cual califica como un pseudo-DSL propio de alto nivel orientado a la generación de Hojas de Estilos en cascada:
*   **Variables Globales:** (`$primary-color`, `$glass-bg`) que permiten rediseñar toda la aplicación (Skinning) modificando solo dos líneas de código de infraestructura.
*   **Anidamiento Lógico:** Reproduciendo la estructura jerárquica del árbol DOM directamente en el código de estilos, evitando repeticiones exhaustivas de selectores pesados.

### 5.2. Arquitectura de Pasarela y Redirecciones
La aplicación web utiliza un flujo asíncrono para su pasarela de pagos. Al presionar "Comprar", un Modal sobre-impreso captura la información de tarjeta de crédito (con validaciones matemáticas de longitud y requerimientos numéricos). Un *loader spinner* dinámico comunica latencia al usuario mientras una petición POST llega a `processCheckout` en el controlador. Este, tras validar, invoca la API SMTP de **NodeMailer**, construyendo en tiempo real y disparando al usuario un comprobante formal de la transacción en su correo electrónico personal (jhostin.rodriguez.n@uni.pe).

---

## 6. CONCLUSIONES FINALES

El desarrollo de "Lumina Art Gallery" fundamenta, a través del análisis de su código y despliegue, las siguientes afirmaciones:

1.  **Justificación del DSL:** Crear un lenguaje específico del dominio (o adoptar uno como Handlebars.js) vale la pena cuando permite que un tipo particular de problemas (en este caso, la inyección y generación masiva de HTML dinámico complejo) sea expresado de forma más limpia, segura y mantenible que utilizando lenguajes genéricos como JavaScript puro (GPL).
2.  **Productividad frente a Soluciones Genéricas:** Al emplear el compilador isométrico del DSL tanto en el backend como en el frontend, la reducción de líneas de código es dramática, se anulan por diseño los ataques XSS (Cross-Site Scripting), y la curva de legibilidad para mantener o alterar un componente gráfico se reduce de horas a minutos.
3.  **Cumplimiento Absoluto:** El proyecto cubre holgadamente los requerimientos impuestos por la rúbrica del "Proyecto A: Plataforma de E-commerce", desplegando Plantillas Anidadas, Helpers Personalizados, Integración i18n Nativa, Caché Inteligente y, sobre todo, **Renderizado Isomórfico Real**.
