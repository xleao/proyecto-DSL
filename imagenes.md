# Imágenes del Proyecto y Transcripción de Texto

A continuación se muestran todas las imágenes de la carpeta `imagenes` junto con la transcripción completa y corregida del texto contenido en cada una de ellas:

---

## 1. Captura de pantalla 2026-06-28 02:03:36

![Captura de pantalla 2026-06-28 020336](imagenes/Captura%20de%20pantalla%202026-06-28%20020336.png)

### Texto contenido en la imagen:
* **DSL**
  * Motor de consultas de datos relacionales
  * Handlebars para generar HTML dinámico
  * Sass/SCSS: generador de Landing Pages
* **1.a. Enunciado de Caso de Uso (Use Case Specification)**
  * Nombre del Caso de Uso: ID: UC-001
  * Actor Principal:
  * Precondiciones:
  * Postcondiciones:
* **b. User Story (Historia de Usuario)**
  * Título:
  * As a `<role>`
  * I want `<feature>`
  * So that `<benefit>`
  * Criterios de Aceptación:
* **2. Criterios de Diseño**
  * **2.a. Arquitectura WEB:** Sistemas y Computación

---

## 2. Captura de pantalla 2026-06-28 02:03:55

![Captura de pantalla 2026-06-28 020355](imagenes/Captura%20de%20pantalla%202026-06-28%20020355.png)

### Texto contenido en la imagen:
* **Tecnología WEB & "Domain-Specific Languages" (DSLs)**
* **Problemática:**
  * Tecnología Web. En una estructura de archivos de un sitio WEB, ¿Cuál de las tecnologías que convergen en las Websites, se considera formalmente un DSL?
  * En la estructura de archivos que incluyen HTML, CSS, JavaScript y JSON, ninguno de ellos se considera formalmente un DSL (Domain-Specific Language) en el sentido estricto de la informática. A continuación la explicación del porqué en cada caso:
* **Análisis por archivo:**
  * **HTML5 (HyperText Markup Language) - `index.html`**
    * **No es un DSL.**
    * **Sustentación:** Aunque usa un dominio específico (documentos Web), el consenso técnico actual clasifica a HTML como un Lenguaje de Marcación (Markup Language), no un lenguaje de programación. No tiene lógica de control (if/else, variables, funciones). Es un DSL declarativo en un sentido muy amplio, pero técnicamente se clasifica como un lenguaje de marcado.
  * **CSS (Cascading Style Sheets) - `styles.css`**
    * **Es un DSL.**
    * **Sustentación:** CSS es un Lenguaje de Hojas de Estilo. Es declarativo y específico del dominio de presentación visual. Sin embargo, no tiene capacidad de programación (no puedes hacer bucles ni lógica compleja nativamente en CSS puro). Se considera un DSL declarativo para el dominio de estilos, pero no un lenguaje de programación.
  * **JavaScript - `script.js`**
    * **No es un DSL.**
    * **Sustentación:** JavaScript es un Lenguaje de Propósito General (GPL). Es Turing-completo. Se puede usar para casi cualquier tarea (web, servidores, móviles, juegos). No está restringido a un dominio específico como bases de datos o sensores.
  * **JSON (JavaScript Object Notation) - `datos.json`**
    * **No es un DSL.**
    * **Sustentación:** JSON es un formato de intercambio de datos, no un lenguaje de programación. No tiene sintaxis de control, lógica ni comandos. Es un formato de datos estructurado (Data Interchange Format) usado para transportar información, pero no para "programar" o ejecutar lógica de dominio.

---

## 3. Captura de pantalla 2026-06-28 02:04:02

![Captura de pantalla 2026-06-28 020402](imagenes/Captura%20de%20pantalla%202026-06-28%20020402.png)

### Texto contenido en la imagen:
* **Domain-Specific Languages (DSL) - ¿Por qué no son DSLs formales?**
  * Un DSL (Domain-Specific Language) formalmente es un lenguaje de programación diseñado para resolver problemas en un dominio específico, que permite expresar soluciones en ese dominio de manera más natural y concisa que un lenguaje de propósito general.
* **Características clave que definen un DSL:**
  * **Dominio Específico:** Resuelve problemas de un área concreta (ej. SQL para bases de datos, AST, parser).
  * **Capacidad de Expresión:** Permite definir lógica, reglas, transformaciones y comportamientos dentro de ese dominio.
  * **Abstracción:** Oculta los detalles complejos de la implementación subyacente.
* **Entorno de tecnología WEB:**
  * **HTML/CSS:** Son lenguajes de marcado y estilos respectivamente. Son declarativos y específicos del dominio web, pero carecen de capacidad de programación lógica (aunque el CSS moderno tiene algunas capacidades limitadas como variables, no es suficientemente potente para considerarse un lenguaje de programación completo). A menudo se les llama pseudo-DSLs o "lenguajes de descripción", pero no DSLs de programación.
* **Ejemplos reales de DSLs que están embebidos en la tecnología Web:**
  * **SQL:** Para hacer queries a bases de datos (DSL para datos relacionales).
  * **Verilog / VHDL:** Para diseñar circuitos electrónicos (DSL para hardware).
  * **LaTeX:** Para componer documentos científicos con fórmulas matemáticas (DSL para edición de texto académico).
  * **Gradle / Maven:** Para definir la construcción de software (DSL para compilación).
  * **Regular Expressions (Regex):** Para buscar patrones en texto (DSL para texto).
* **Conclusión:**
  * En tu proyecto web estás utilizando un conjunto de tecnologías estándar para web (HTML, CSS, JS, JSON). Si quisieras implementar un DSL en este contexto, tendrías que crear un lenguaje nuevo o usar uno existente para algo específico; por ejemplo:
    * Usar SQL dentro de un script de JS para hacer queries a una base de datos (SQL sería el DSL).
    * Usar Sass/SCSS (un preprocesador CSS que es un DSL sobre CSS) en lugar de CSS.
    * Usar Jinja o Handlebars (plantillas que son DSLs para generar HTML dinámico) en lugar de inyectar HTML directamente con JS.

---

## 4. Captura de pantalla 2026-06-28 02:07:01

![Captura de pantalla 2026-06-28 020701](imagenes/Captura%20de%20pantalla%202026-06-28%20020701.png)

### Texto contenido en la imagen:
* **3.a. Proyecto A: Plataforma de E-commerce con Plantillas Handlebars**
  * **Descripción:** Tienda online completa donde todas las vistas se generan mediante plantillas Handlebars con lógica de negocio separada del markup.
  * **Características clave:**
    * Sistema de plantillas anidadas (layouts, partials, helpers).
    * Custom Handlebars helpers para formato de datos.
    * Renderizado del lado del cliente y servidor (isomórfico).
    * Sistema de internacionalización (i18n) integrado en plantillas.
    * Caché inteligente de plantillas compiladas.
  * **Tecnologías:** Handlebars.js, Node.js, Express, MongoDB, i18next.

---

## 5. Captura de pantalla 2026-06-28 02:07:20

![Captura de pantalla 2026-06-28 020720](imagenes/Captura%20de%20pantalla%202026-06-28%20020720.png)

### Texto contenido en la imagen:
* **Recomendaciones para la presentación:**
  * **Para todos los proyectos:**
    * Documentar claramente por qué el lenguaje elegido es un DSL.
    * Mostrar ejemplos de código que demuestren la ventaja del DSL sobre la solución genérica.
    * Incluir métricas de productividad y mantenibilidad.
    * Demostrar casos de uso reales donde el DSL simplifica el desarrollo.
* **Estructura de presentación:**
  * Problema identificado
  * Por qué un DSL es la solución adecuada
  * Demostración en vivo del DSL en acción
  * Comparativa: con DSL vs sin DSL
  * Lecciones aprendidas y mejores prácticas
  * Resumen
* **Bases Teóricas DSLs:**
  * Crear un lenguaje específico del dominio (con software que lo soporte) vale la pena cuando permite que un tipo particular de problemas o soluciones puedan ser expresadas más claramente que con otros lenguajes existentes, y el tipo de problema en cuestión reaparece lo suficiente.
  * La programación orientada a lenguajes considera la creación de lenguajes específicos para expresar problemas como una parte estándar del proceso de solucionar un problema.
  * Los lenguajes específicos de dominio se componen generalmente de una sintaxis abstracta y de una sintaxis concreta. La sintaxis abstracta se define por medio de un metamodelo que especifica las reglas del lenguaje, los elementos que lo componen y las relaciones que existen entre ellos. Por su parte, la sintaxis concreta asocia a cada elemento del metamodelo una representación, ya sea textual o gráfica [2].
  * En los DSL, la semántica del lenguaje está muy cercana al dominio del problema para el cual se diseña. Tienen un alto nivel de abstracción para el usuario y, por tanto, están dirigidos a expertos en el dominio.
* **Diseño del metamodelo:**
  * El metamodelado es el análisis, diseño y construcción de los metamodelos necesarios para cubrir un determinado tipo de problemas, así como las reglas y restricciones aplicables.
  * **Metamodelo:** conjunto de conceptos del dominio a modelar (metaclases) y las relaciones entre ellos (metasociaciones).
* **Desarrollo del modelo de presentación:**
  * Tendremos que elegir, según el problema a resolver, cuál es el formato de representación más adecuado para nuestro DSL. ¿Cuál es el tipo de problema que queremos modelar? ¿Quiénes serán los usuarios del lenguaje?
  * **Dos tipos de DSL:**
    * **Textuales:** más expresivos, están basados en una gramática.
    * **Visuales:** más fáciles de interpretar, basados en un mapping entre elementos gráficos y elementos de nuestro metamodelo.
