# Guion de Presentación: Proyecto DSL (Lumina Art Gallery)

## 1. Problema Identificado
*   **Teoría de Lenguajes:** Tecnologías como HTML y CSS, aunque fundamentales, no son DSLs (Domain-Specific Languages) de programación. JS es de propósito general, no específico.
*   Para hacer una vista dinámica sin usar React o Angular, tradicionalmente terminaríamos mezclando HTML dentro del código del servidor usando *String Interpolation* (`let html = "<div class='card'>" + product.name + "</div>";`).
*   Esto viola el principio de Responsabilidad Única y hace el código inmantenible.

## 2. Por qué Handlebars es la Solución (Nuestra Implementación)
*   **Handlebars es un DSL Textual** diseñado *estrictamente* para el dominio de generación de Vistas/Plantillas.
*   **Explicación del Metamodelo en nuestro Proyecto:**
    *   **Sintaxis Abstracta:** Nuestras reglas de negocio en Node.js (separar obras por categoría, calcular precios).
    *   **Sintaxis Concreta:** La forma en que escribimos Handlebars (`{{#each menProducts}}`, `{{> productCard}}`), que mapea limpiamente nuestros catálogos hacia el HTML puro.

## 3. Demostración en Vivo
*   *Acción:* Abre la página principal de la Galería de Arte (Lumina Gallery).
*   **Punto clave:** "Profesor, este diseño limpio estilo Galería que está viendo no contiene ni un solo bloque `forEach` en la vista HTML. Todo fue generado en el servidor por el motor del DSL Handlebars".
*   *Acción:* Cambia el idioma usando el switch `ES/EN`.
*   Muestra cómo construimos un Helper propio (`{{t 'clave'}}`) para que el DSL hable con el paquete de internacionalización en tiempo real.

## 4. Comparativa de Código: Vanilla JS vs DSL Handlebars
**Sin DSL (Javascript Puro - Vanilla):**
```javascript
let html = '';
for(let i = 0; i < artProducts.length; i++) {
    html += '<article class="product-card">';
    html += '<h3>' + artProducts[i].name + '</h3>';
    if(artProducts[i].isNewArrival) {
        html += '<span class="badge">Nuevo</span>';
    }
    html += '</article>';
}
```
*(Es sucio, acoplado al backend y propenso a inyecciones XSS).*

**Con DSL (Handlebars - Nuestro Proyecto):**
```handlebars
{{#each artProducts}}
    <article class="product-card">
        <h3>{{translate nameKey}}</h3>
        {{#if isNewArrival}}
            <span class="badge">Nuevo</span>
        {{/if}}
    </article>
{{/each}}
```
*(Declarativo, seguro, modular y expresivo).*

## 5. Lecciones Aprendidas y Mejores Prácticas
*   **Componentización (Partials):** Usar `{{> productCard}}` nos permitió crear la tarjeta de la obra de arte una sola vez y reciclarla en todos los catálogos.
*   **Renderizado Isomórfico:** Cumplimos con el uso del DSL Handlebars tanto en el servidor (para el catálogo) como en el **cliente** (usando `Handlebars.compile` para renderizar el carrito de compras dinámicamente sin ensuciar el JS con templates).
*   **Caché inteligente:** Configurar Express para compilar el árbol de sintaxis abstracta (AST) de Handlebars una sola vez en producción acelera drásticamente los milisegundos de respuesta.
*   **SCSS como Segundo DSL:** Usamos variables y anidamiento en SCSS para crear la interfaz gráfica sin usar frameworks como Bootstrap, demostrando dominio de tecnologías web.
