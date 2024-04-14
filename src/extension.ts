import * as vscode from 'vscode';
import { parseMakeupJson } from './sortHelpers';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "json-markup-sort" is now active!');

  let disposable = vscode.commands.registerCommand('json-markup-sort.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from JsonMarkupSort!');
  });

  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand('json-markup-sort.sortJsonKeys', () => {
    vscode.window.showInformationMessage('sortJsonKeys from dean');

    try {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const highlightedText = document.getText(selection);

        const sortedJson = parseMakeupJson(highlightedText);

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, sortedJson);
        });
      }
    } catch (e: any) {
      vscode.window.showErrorMessage(e.message || 'An error occurred');
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
