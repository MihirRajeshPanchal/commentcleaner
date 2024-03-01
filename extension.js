const vscode = require('vscode');

const commentPatterns = {
  javascript: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  typescript: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  python: /#(?!.*TODO).*$/gm,
  java: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  csharp: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  kotlin: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  ruby: /#(?!.*TODO).*$/gm,
  php: /#(?!.*TODO).*$/gm,
  perl: /#(?!.*TODO).*$/gm,
  go: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  swift: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  c: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  cpp: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  rust: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  lua: /--(?!.*TODO).*$/gm,
  powershell: /#(?!.*TODO).*$/gm,
  yaml: /#(?!.*TODO).*/g,
  yml: /#(?!.*TODO).*/g,
  dart: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  html: /<!--(?!.*TODO)[\s\S]*?-->/g,
  css: /\/\*(?!.*TODO)[\s\S]*?\*\//g,
  scss: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  less: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  shellscript: /#(?!.*TODO).*$/gm,
  bat: /REM(?!.*TODO).*$/gm,
  r: /#(?!.*TODO).*$/gm,
  groovy: /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  coffeescript: /#(?!.*TODO).*$/gm,
  "objective-c": /\/\/(?!.*TODO).*|\/\*[\s\S]*?\*\//g,
  vb: /'(?!.*TODO).*$/gm,
  vbnet: /'(?!.*TODO).*$/gm,
  perl6: /#(?!.*TODO).*$/gm,
  clojure: /;(?!.*TODO).*$/gm,
  julia: /#(?!.*TODO).*$/gm,
  sql: /--(?!.*TODO).*$/gm,
  plsql: /--(?!.*TODO).*$/gm,
  tsql: /--(?!.*TODO).*$/gm,
  raku: /#(?!.*TODO).*$/gm,
};

function removeComments(text, languageId) {
  const commentPattern = commentPatterns[languageId] || /(?:)/g; // Default to a pattern that doesn't match anything.
  const stringLiterals = [];
  const placeholder = '___STRING_LITERAL___';

  // Replace string literals with placeholders
  text = text.replace(/(["'`])(?:\\.|(?!\1)[^\\\n])*\1/g, (match) => {
    stringLiterals.push(match);
    return placeholder;
  });

  // Remove comments
  text = text.replace(commentPattern, '');

  // Replace placeholders with string literals
  stringLiterals.forEach((literal) => {
    text = text.replace(placeholder, literal);
  });

  return text;
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
