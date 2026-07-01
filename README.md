# Guía de Instalación y Ejecución

Este documento explica cómo instalar y ejecutar el proyecto localmente.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (versión recomendada LTS)
- **MongoDB**

---

## 1. Configuración de MongoDB

Este proyecto requiere una base de datos MongoDB activa. Si no tienes el servidor de MongoDB ejecutándose de forma permanente (como un servicio automático), debes iniciarlo manualmente antes de correr la aplicación:

### Cómo iniciar MongoDB en Windows:
- **Opción A (Mediante la línea de comandos):**
  Abre una terminal (PowerShell o CMD) y ejecuta el siguiente comando:
  ```bash
  mongod
  ```
  *(Nota: Si no reconoce el comando, asegúrate de tener la ruta de instalación de MongoDB en las variables de entorno de tu sistema, usualmente en `C:\Program Files\MongoDB\Server\<versión>\bin`)*

- **Opción B (Mediante Servicios de Windows):**
  1. Presiona `Win + R`, escribe `services.msc` y presiona Enter.
  2. Busca el servicio llamado **MongoDB Server** (o similar).
  3. Haz clic derecho sobre él y selecciona **Iniciar** (Start).

---

## 2. Instalación de Dependencias

Una vez que tengas MongoDB en ejecución, abre la carpeta del proyecto en tu terminal e instala las dependencias necesarias de Node.js:

```bash
npm install
```

---

## 3. Cargar Datos de Prueba (Seed)

Para poblar la base de datos con los datos iniciales necesarios para el funcionamiento del proyecto, ejecuta el script de seed:

```bash
npm run seed
```

---

## 4. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo en modo local, ejecuta:

```bash
npm run dev
```

El servidor estará disponible en la dirección local indicada por la terminal (usualmente `http://localhost:3000` o la definida en el archivo `.env`).
