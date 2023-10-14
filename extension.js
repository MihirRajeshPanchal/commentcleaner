const vscode = require('vscode');

const commentPatterns = {
  javascript: /\/\/.*|\/\*[\s\S]*?\*\//g,
  python: /#.*$/gm,
  java: /\/\/.*|\/\*[\s\S]*?\*\//g,
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
