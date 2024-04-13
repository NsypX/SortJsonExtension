"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const checkIfJsonReturnKeys = (input) => {
    const trimmed = input.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
        const retVal = trimmed.slice(1, -1);
        return retVal;
    }
    throw new Error('Not a valid JSON');
};
const parseAndSortJson = (input) => {
    const keysAndValues = checkIfJsonReturnKeys(input);
    const lines = keysAndValues.split(',\n').map((line) => line.replace(/[\n\t\s]/g, '').trim());
    const parsedEntries = lines
        .map((line) => {
        const [key, ...values] = line.split(':');
        if (values.length === 0) {
            return null;
        }
        const value = values.join(':');
        return { key, value };
    })
        .filter(Boolean);
    // sort by key
    const sortedEntries = parsedEntries.sort((a, b) => {
        if (a.key < b.key) {
            return -1;
        }
        if (a.key > b.key) {
            return 1;
        }
        return 0;
    });
    const retVal = `{\n${sortedEntries.map(({ key, value }) => `${key}: ${value},\n`).join('')}\n}`;
    return retVal;
};
function activate(context) {
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
                const sortedJson = parseAndSortJson(highlightedText);
                editor.edit((editBuilder) => {
                    editBuilder.replace(selection, sortedJson);
                });
            }
        }
        catch (e) {
            vscode.window.showErrorMessage(e.message || 'An error occurred');
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map