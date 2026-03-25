const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });

  // menu personalizado
const template = [
  {
    label: "Editar",
    submenu: [
      { role: "undo", label: "Deshacer" },
      { role: "redo", label: "Rehacer" },
      { type: "separator" },
      { role: "cut", label: "Cortar" },
      { role: "copy", label: "Copiar" },
      { role: "paste", label: "Pegar" },
      { role: "selectAll", label: "Seleccionar todo" }
    ]
  },
  {
  label: "Ayuda",
  submenu: [
    {
      label: "Instructivo",
      click: () => {
        const instructivoWindow = new BrowserWindow({
          width: 800,
          height: 600,
          title: "Instructivo",
          webPreferences: {
            preload: path.join(__dirname, "preload.js")
          }
        });

        const rutaInstructivo = app.isPackaged
          ? path.join(process.resourcesPath, "docs", "instructivo.html")
          : path.join(__dirname, "..", "docs", "instructivo.html");

        instructivoWindow.loadFile(rutaInstructivo);
      }
    }
  ]
}
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

  win.loadFile(path.join(__dirname,"index.html"));
}

app.whenReady().then(() => {
createWindow();
});

// FUNCIÓN PARA GENERAR LA ESTRUCTURA
ipcMain.handle("generate-structure", async (event, text) => {
  console.log("TEXTO RECIBIDO:", text);
  try {
    // 1. Abrir diálogo para elegir carpeta
    const result = await dialog.showOpenDialog({
  properties: ["openDirectory"]
});

// Mostrar lo que devuelve el diálogo
console.log("RESULTADO DEL DIALOGO:", result);

if (!result || result.canceled) {
  return { success: false, error: "El usuario canceló la selección." };
}

// Capturar TODAS las variantes posibles
let basePath = null;

if (Array.isArray(result)) {
  // Formato antiguo: ["C:/ruta"]
  basePath = result[0];
} else if (Array.isArray(result.filePaths)) {
  // Formato moderno: { filePaths: ["C:/ruta"] }
  basePath = result.filePaths[0];
} else if (typeof result.filePath === "string") {
  // Formato raro: { filePath: "C:/ruta" }
  basePath = result.filePath;
}

if (!basePath) {
  return { success: false, error: "No se pudo obtener la ruta seleccionada." };
}

    // 2. Parsear líneas
    const lines = text.split("\n").filter(l => l.trim() !== "");
    if (lines.length === 0) {
      return { success: false, error: "El texto está vacío." };
    }

    // 3. La primera línea es la carpeta raíz
    const rootName = lines[0].trim();
    const rootPath = path.join(basePath, rootName);

    // Crear carpeta raíz
    if (!fs.existsSync(rootPath)) {
      fs.mkdirSync(rootPath);
    }

      // 4. Procesar el resto de líneas
      const stack = [rootPath]; // Pila de niveles

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Detectar indentación real (tabs o espacios)
      const indent = line.match(/^\s*/)[0];

      // Convertir tabs a 2 espacios para normalizar
      const normalized = indent.replace(/\t/g, "  ");

      // Cada 2 espacios = un nivel
      const level = normalized.length / 2;

      const name = line.trim();
      const isFile = name.includes(".");

      // Ajustar el tamaño del stack sin borrar niveles válidos
      stack.splice(level + 1);

      // Si el nivel no existe, usar el nivel anterior
      if (!stack[level]) {
      stack[level] = stack[level - 1] || rootPath;
      }

      const fullPath = path.join(stack[level], name);

      if (isFile) {
        fs.writeFileSync(fullPath, "");
      } else {
        if (!fs.existsSync(fullPath)) {
          fs.mkdirSync(fullPath);
        }
      }

      // Si es carpeta, agregarla a la pila
      if (!isFile) {
        stack[level + 1] = fullPath;
      }
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});