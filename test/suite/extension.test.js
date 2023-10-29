const assert = require('assert');
const vscode = require('vscode');


suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    // Define a timeout for the test case (adjust as needed)

    test('Test Extension Command', async function () {
        // Execute the "extension.removeComments" command
        await vscode.commands.executeCommand('extension.removeComments');

        // Retrieve the active text editor after executing the command
        const editor = vscode.window.activeTextEditor;

        // Ensure that an editor is active after executing the command
        assert.ok(editor, 'No active text editor after executing the command');

        // Access the content of the edited document
        const editedDocument = editor.document;
        const editedContent = editedDocument.getText();

        // Define the expected content without comments
        const expectedContent = `public class HelloWorld {\n    \n    \n    public static void main(String[] args) {\n        \n        \n        System.out.println("Hello, world!");\n    }\n}`;

        // Assert that the edited content matches the expected content
        assert.strictEqual(editedContent, expectedContent);

        // Optionally, you can close the editor after testing
        await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
    });

    // ... Add more test cases as needed for various languages and scenarios

    // Clean up: Close any open editors after all tests are done (optional)
    teardown(async () => {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    });
});
