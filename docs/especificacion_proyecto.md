# UNIVERSIDAD NACIONAL DE INGENIERIA
## Facultad de Ingeniería Industrial y de Sistemas
## Escuela Profesional de Ingeniería de Software

**Especificación: DSL**
**Análisis, Diseño e Implementación**

**CodeLAB: Proyecto colaborativo**
**DSL Aplicado: "Lumina Art Gallery"**

**Profesor:** Ing. Jorge Medianero
**Ciclo:** 2026-I
**Curso:** Diseño de Software (SW261)
**Grupo:** 03

---

## 1. Título del Proyecto
**Handlebars como DSL para la Generación Dinámica de Vistas en una Galería de Arte Contemporáneo**

## 2. Descripción del Proyecto
El proyecto consiste en el desarrollo de una plataforma web completa (E-commerce) orientada a la venta de obras de arte contemporáneo (Lumina Art Gallery). 
El núcleo del proyecto radica en la demostración del uso de **Handlebars.js** como un Lenguaje Específico de Dominio (DSL) para la capa de presentación (Vistas). Se demostrará cómo un DSL de plantillas permite abstraer la sintaxis concreta de HTML y separar la lógica de negocio (Sintaxis Abstracta) mediante el renderizado isomórfico y el patrón MVC.

## 3. Justificación Tecnológica (Metamodelo y DSL)
*   **Problema:** En el desarrollo sin frameworks, la concatenación de *Strings* en JavaScript (Vanilla) para generar HTML es propensa a errores, inyecciones XSS y acoplamiento excesivo de responsabilidades.
*   **Solución DSL:** Handlebars actúa como un lenguaje declarativo donde el "dominio" es la generación de UI. Proporciona su propia gramática (`{{#each}}`, `{{> partial}}`) que se compila a funciones JavaScript ultrarrápidas, logrando una arquitectura limpia.
*   **Aporte:** Se ha integrado un sistema de internacionalización (i18n) directamente incrustado en el DSL mediante Helpers personalizados (`{{t 'clave'}}`), demostrando su extensibilidad.

## 4. Requerimientos Funcionales
1.  El sistema debe mostrar catálogos separados por categorías artísticas (Paisajes, Abstracto, Fotografía).
2.  El sistema debe inyectar los datos del modelo `Product` a través de Handlebars en el servidor.
3.  El sistema debe soportar traducción instantánea (Inglés/Español).
4.  El sistema debe ser resiliente: Si la Base de Datos falla, debe levantar con catálogos en memoria (Fallback).

## 5. Diseño UX / UI
*   **Estilo:** Minimalista, luminoso, inspirado en galerías de arte globales.
*   **Técnica:** Diseño *Mobile-first* estructurado mediante CSS Grid y SCSS (Sass, utilizado también como DSL de preprocesamiento de estilos).

## 6. Historias de Usuario Principales
**ID:** HU-01 - Visualización del Catálogo
**Como** amante del arte.
**Quiero** ver las obras agrupadas por categoría (Paisajes, Abstracto, etc).
**Para** encontrar rápidamente el estilo artístico que deseo adquirir.
**Criterios de Aceptación:**
*   Debe existir una barra de navegación con links ancla.
*   Debe renderizarse una tarjeta de producto modular (usando Partials del DSL).
*   La tarjeta debe mostrar la obra de arte, precio, tamaños de lienzo disponibles y botón de compra.
