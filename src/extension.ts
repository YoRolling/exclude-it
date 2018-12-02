'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const Path = require('path');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "exclude-it" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'extension.excludeWs',
        () => {
            // The code you place here will be executed every time your command is executed

            // Display a message box to the user
            vscode.window.showInformationMessage('Hello World!');
        }
    );
    // excludeglobal
    context.subscriptions.push(disposable);
    context.subscriptions.push(registerGlobal());
}

function registerGlobal() {
    let disposable = vscode.commands.registerCommand(
        'extension.excludeglobal',
        (uri: vscode.Uri) => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            const parseMeta = parseFilePath(uri.path);
            vscode.window.showInformationMessage(JSON.stringify(uri));
        }
    );
    return disposable;
}

/**
 * @author YoRolling
 * @param filePath
 */
function parseFilePath(filePath: String): Promise<{} | Error> {
    return new Promise((res, rej) => {
        fs.exists(filePath, (error: Error, stat) => {
            if (error) {
                rej(error);
                return;
            }
            const extname = Path.extname(filePath);
            const basename = Path.basename(filePath);
            const dirname = Path.dirname(filePath);
            res({
                path: filePath,
                extname,
                basename,
                dirname
            });
        });
    });
}
// this method is called when your extension is deactivated
export function deactivate() {}
