const path = require("path");

require.config({
  paths: {
    vs: path.join(__dirname, "../node_modules/monaco-editor/min/vs")
  }
});

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
    document.getElementById("preview").textContent = editor.getValue();
  };

  // Botón Generar estructura
  document.getElementById("btn-generate").onclick = () => {
    alert("Aquí generaremos carpetas y archivos");
  };

});