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
  shellscript: /#.*$/gm,
  bat: /REM.*$/gm,
  r: /#.*$/gm,
  groovy: /\/\/.*|\/\*[\s\S]*?\*\//g,
  coffeescript: /#.*$/gm,
  "objective-c": /\/\/.*|\/\*[\s\S]*?\*\//g,
  vb: /'.*$/gm,
  vbnet: /'.*$/gm,
  perl6: /#.*$/gm,
  clojure: /;.*$/gm,
  julia: /#.*$/gm,
  sql: /--.*$/gm,
  plsql: /--.*$/gm,
  tsql: /--.*$/gm,
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
      if (!commentPatterns[languageId]) {
        // Notify the user about the lack of predefined patterns
        vscode.window.showInformationMessage(`Comment removal not supported for language: ${languageId}`);
        return;
      }
      
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
