require(["vs/editor/editor.main"], function () {

  // Crear el editor y GUARDARLO en una variable
  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: "",
    language: "json",
    theme: "vs-dark"
  });

  // Botón JSON
  document.getElementById("btn-json").onclick = () => {
    monaco.editor.setModelLanguage(editor.getModel(), "json");
  };

  // Botón Markdown
  document.getElementById("btn-md").onclick = () => {
    monaco.editor.setModelLanguage(editor.getModel(), "markdown");
  };

  // Botón Vista previa
  document.getElementById("btn-preview").onclick = () => {
   document.getElementById("preview").textContent =
   generateTreePreview(editor.getValue()); 
  };

  // Botón Generar estructura
  document.getElementById("btn-generate").onclick = async () => {
  const text = editor.getValue();
  const result = await window.electronAPI.generateStructure(text);

  if (result.success) {
    alert("Proyecto generado correctamente.");
  } else {
    alert("No se generó el proyecto: " + result.error);
  }
};

   // --- Generador de árbol alineado con símbolos + íconos ---
  function generateTreePreview(text) {
    const lines = text.split("\n").filter(l => l.trim() !== "");

    // Paso 1: convertir líneas en nodos con nivel
    const nodes = lines.map(line => {
      const level = line.match(/^ */)[0].length / 2;
      const name = line.trim();
      const isFile = name.includes(".");
      return { level, name, isFile };
    });

    let output = "";

    for (let i = 0; i < nodes.length; i++) {
      const { level, name, isFile } = nodes[i];
      const icon = isFile ? "📄 " : "📁 ";

      let prefix = "";

      // Construir prefijos de niveles anteriores
      for (let lvl = 0; lvl < level; lvl++) {
        const hasSibling = nodes.some(
          (n, idx) => idx > i && n.level === lvl
        );
        prefix += hasSibling ? "│   " : "    ";
      }

      // Determinar si es último hijo del nivel actual
      const isLast =
        i === nodes.length - 1 ||
        nodes[i + 1].level < level;

      prefix += isLast ? "└── " : "├── ";

      output += prefix + icon + name + "\n";
    }

    return output;
  }

});