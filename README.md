# Generador de Estructuras de Proyecto

Esta herramienta permite crear estructuras completas de carpetas y archivos a partir de un esquema escrito con indentación. Ideal para iniciar proyectos rápidamente sin crear carpetas manualmente.

---

## 🚀 Caracteristicas

- Generación automática de carpetas y archivos según la estructura escrita por el usuario.
- Interfaz limpia y estilo similar a VS Code.
- Editor integrado con Monaco Editor.
- Instructivo accesible desde el menú de la aplicación.
- Compatible con Windows, Linux y macOS.
- Empaquetable mediante Electron Forge.

## 🚀 Instrucciones
1. Abre la aplicación.
2. En el editor, escribe la estructura deseada usando indentación de 2 espacios por nivel.  
   Ejemplo:
3. Presiona **Generar estructura**.
4. Selecciona la carpeta donde quieres que se cree el proyecto.
5. La herramienta generará automáticamente todas las carpetas y archivos.

---

## 📌 Reglas de indentación

- **0 espacios** → carpeta raíz  
- **2 espacios** → subcarpeta nivel 1  
- **4 espacios** → subcarpeta nivel 2  
- **6 espacios** → subcarpeta nivel 3  
- Los archivos siguen la misma regla.

La herramienta soporta **tabs**, pero se recomienda usar **2 espacios por nivel**.

---

## 📂 Ejemplo de estructura generada

Entrada:
MiProyecto styles style.css index.html

Salida:
MiProyecto/ ├── styles/ │   └── style.css └── index.html

---

## 🧩 Requisitos

- Windows 10 o superior
- Node.js (solo para desarrollo)
- Electron (incluido en el instalador)

---
## 🧩 Tecnologias utilizadas
- Electron
- Node.js
- Monaco Editor
- HTML, CSS y JavaScript


## 📦 Instalación para desarrolladores
npm install npm start
Para generar instalador:
npm run make

---

## 👨‍💻 Autor

German – Herramienta para automatizar estructuras de proyectos.