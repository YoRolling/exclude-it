"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as utils from "./utils/utils";
import { isNullOrUndefined } from "util";
const rootPath = vscode.workspace.rootPath;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        "extension.excludeWs",
        (uri: vscode.Uri) => {
            globMatch(uri, false);
        }
    );
    // excludeglobal
    context.subscriptions.push(disposable);
    context.subscriptions.push(registerGlobal(context));
}

function registerGlobal(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "extension.excludeglobal",
        (uri: vscode.Uri) => {
            globMatch(uri, true);
        }
    );
    return disposable;
}

/**
 * show file glob quick pick to decide which `glob` will be add to exluded
 * @author YoRolling
 * @since 1.0.0
 * @param {string[]} items
 * @returns
 */
function shouldShowPicker(items: string[]) {
    return vscode.window.showQuickPick(items, {
        canPickMany: true
    });
}
// this method is called when your extension is deactivated
export function deactivate() {}

/**
 * flush config to settings.json
 * @author YoRolling
 * @since 1.0.0
 * @param {string} key
 * @param {*} values
 * @returns
 */
function flushConf(key: string, values: string[], global: boolean) {
    if (isNullOrUndefined(key)) {
        vscode.window.showErrorMessage(`E1000001: Internal error`);
        return;
    }
    if (isNullOrUndefined(values)) {
        vscode.window.showErrorMessage(`E1000002: Internal error`);
        return;
    }
    const config = vscode.workspace.getConfiguration("files");
    let clude: any = config.get("exclude");
    if (!clude) {
        clude = {};
    }
    try {
        Array.from(new Set(values)).filter((v) => v !== '*' ).forEach((glob: string) => {
            clude[glob] = true;
        });

        config.update("exclude", clude, global).then(() => {
            vscode.window.showInformationMessage("♡ You got it!");
        });
    } catch (error) {

    }
}

/**
 *
 * 
 * @param {vscode.Uri} uri
 * @param {boolean} [isGlobal=true]
 */
async function globMatch(uri: vscode.Uri, isGlobal = true) {
    try {
        const realPath = uri.fsPath;
        const fileMeta = <utils.Meta>(
            await utils.parseFilePath(realPath, rootPath)
        );
        const isFile = await utils.isFile(realPath);
        const isFolder = await utils.isFolder(realPath);
        let result: string[] | undefined;
        let glob: string[] = [];
        if (isFile) {

            Object.keys(fileMeta).forEach(key => {
                let r = undefined;
                switch (key) {
                    case "path":
                        break;
                    case "extname":
                        r = fileMeta[key] ?  `**/*${fileMeta[key]}` : undefined ;
                        break;
                    case "basename":
                        r = fileMeta[key];
                        break;
                    case "dirname":
                        r = fileMeta[key]
                            ? `${fileMeta[key] + "/"}*.*`
                            : undefined;
                        break;
                }
                if (r) {
                    glob.push(r);
                }
            });
            if(fileMeta["dirname"]) {
                if(fileMeta["extname"]) {
                    glob.push(
                        `${ fileMeta["dirname"]}/*${fileMeta["extname"]}`
                    );
                }
            } else {
                if(fileMeta["extname"]) {
                    glob.push(
                        `*${fileMeta["extname"]}`
                    );
                }
            }
            
            if (fileMeta["basename"]) {
                glob.push(`**/${fileMeta["basename"]}`);
                if ( fileMeta['dirname'] ) {
                    glob.push(`${fileMeta['dirname']}/${fileMeta["basename"]}`);
                }
            }
            result = await shouldShowPicker(glob);
        } else if (isFolder) {
            result = [`${fileMeta.basename}`];
        }
        if (result) {
            flushConf("files.exclude", result, isGlobal);
        }
    } catch (error) {
        vscode.window.showErrorMessage(error.message || error);
    }
}
