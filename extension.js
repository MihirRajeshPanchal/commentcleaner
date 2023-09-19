const vscode = require('vscode');

function removeComments(text, languageId) {
  let commentPattern;
  if (languageId === 'javascript' || languageId === 'typescript') {
    commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;
  } else if (languageId === 'python') {
    commentPattern = /#.*$/gm;
  } else if (languageId === 'java' || languageId === 'csharp' || languageId === 'kotlin') {
    commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;
  } else if (languageId === 'ruby' || languageId === 'php' || languageId === 'perl') {
    commentPattern = /#.*$/gm;
  } else if (languageId === 'go') {
    commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;
  } else if (languageId === 'swift') {
    commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;
  } else if (languageId === 'c' || languageId === 'cpp') {
    commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;
  } else if (languageId === 'rust') {
    commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;
  } else if (languageId === 'lua') {
    commentPattern = /--.*$/gm;
  } else if (languageId === 'powershell') {
    commentPattern = /#.*$/gm;
  } else if (languageId === 'yaml' || languageId === 'yml') {
    commentPattern = /#.*/g;
  } else if (languageId === 'dart') {
    commentPattern = /\/\/.*|\/\*[\s\S]*?\*\//g;
  }	
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
