const vscode = require('vscode');

const commentPatterns = {
  javascript: /\/\/.*|\/\*[\s\S]*?\*\//g,
  typescript: /\/\/.*|\/\*[\s\S]*?\*\//g,
  python: /#.*$/gm,
  java: /\/\/.*|\/\*[\s\S]*?\*\//g,
  csharp: /\/\/.*|\/\*[\s\S]*?\*\//g,
  kotlin: /\/\/.*|\/\*[\s\S]*?\*\//g,
  ruby: /#.*$/gm,
  php: /#.*$/gm,
  perl: /#.*$/gm,
  go: /\/\/.*|\/\*[\s\S]*?\*\//g,
  swift: /\/\/.*|\/\*[\s\S]*?\*\//g,
  c: /\/\/.*|\/\*[\s\S]*?\*\//g,
  cpp: /\/\/.*|\/\*[\s\S]*?\*\//g,
  rust: /\/\/.*|\/\*[\s\S]*?\*\//g,
  lua: /--.*$/gm,
  powershell: /#.*$/gm,
  yaml: /#.*/g,
  yml: /#.*/g,
  dart: /\/\/.*|\/\*[\s\S]*?\*\//g,
  html: /<!--[\s\S]*?-->/g,
  css: /\/\*[\s\S]*?\*\//g,
  scss: /\/\/.*|\/\*[\s\S]*?\*\//g,
  less: /\/\/.*|\/\*[\s\S]*?\*\//g,
  shell: /#.*$/gm,
  batch: /REM.*$/gm,
  r: /#.*$/gm,
  matlab: /%.*$/gm,
  groovy: /\/\/.*|\/\*[\s\S]*?\*\//g,
  coffeescript: /#.*$/gm,
  objectivec: /\/\/.*|\/\*[\s\S]*?\*\//g,
  scala: /\/\/.*|\/\*[\s\S]*?\*\//g,
  vb: /'.*$/gm,
  vbnet: /'.*$/gm,
  perl6: /#.*$/gm,
  crystal: /#.*$/gm,
  elixir: /#.*$/gm,
  clojure: /;.*$/gm,
  julia: /#.*$/gm,
  haskell: /--.*$/gm,
  racket: /;.*$/gm,
  fortran: /!.*$/gm,
  ada: /--.*$/gm,
  vhdl: /--.*$/gm,
  verilog: /\/\/.*|\/\*[\s\S]*?\*\//g,
  sql: /--.*$/gm,
  plsql: /--.*$/gm,
  tsql: /--.*$/gm,
  apex: /\/\/.*|\/\*[\s\S]*?\*\//g,
  solidity: /\/\/.*|\/\*[\s\S]*?\*\//g,
  qsharp: /\/\/.*|\/\*[\s\S]*?\*\//g,
  abap: /\".*$/gm,
  cobol: /.*\*\*.*$/gm,
  foxpro: /\*.*$/gm,
  reason: /\/\/.*|\/\*[\s\S]*?\*\//g,
  raku: /#.*$/gm,
};

function removeComments(text, languageId) {
  const commentPattern = commentPatterns[languageId] || /(?:)/g; // Default to a pattern that doesn't match anything.
  return text.replace(commentPattern, '');
}

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.removeComments', function () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const languageId = document.languageId;
      const text = document.getText();
      const newText = removeComments(text, languageId);
      editor.edit(editBuilder => {
        editBuilder.replace(
          new vscode.Range(document.positionAt(0), document.positionAt(text.length)),
          newText
        );
      });
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
