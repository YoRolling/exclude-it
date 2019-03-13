"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as utils from "./utils/utils";
import { isNullOrUndefined } from "util";
const rootPath = vscode.workspace.rootPath;
const subdir = require('subdir');
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
function flushConf(
    key: string,
    values: string[],
    global: boolean,
    uri: vscode.Uri
) {
    if(values && values.length === 0 ) {
        return false;
    }
    if (isNullOrUndefined(key)) {
        vscode.window.showErrorMessage(`E1000001: Internal error`);
        return;
    }
    if (isNullOrUndefined(values)) {
        vscode.window.showErrorMessage(`E1000002: Internal error`);
        return;
    }
    const config = vscode.workspace.getConfiguration("files", uri);
    console.log('config', JSON.stringify(config));
    let clude: any = config.get("exclude");
    if (!clude) {
        clude = {};
    }
    try {
        Array.from(new Set(values))
            .filter(v => v !== "*")
            .forEach((glob: string) => {
                clude[glob] = true;
            });
        
        let target: vscode.ConfigurationTarget = global
            ? vscode.ConfigurationTarget.Global
            : vscode.ConfigurationTarget.Workspace;

        if(!global && isMultiRoot()){
            const config = getExtenstionConfig(uri);
            let isFlushFolder = config.get('folder');
            target = isFlushFolder ? vscode.ConfigurationTarget.WorkspaceFolder : vscode.ConfigurationTarget.Workspace;
        }
        config.update("exclude", clude, target).then(() => {
            vscode.window.showInformationMessage("♡ You got it!");
        });
    } catch (error) {}
}
/**
 *
 * @author YoRolling
 * @version 1.2.0
 * @returns {boolean}
 */
function isMultiRoot(): boolean {
    if (vscode.workspace.workspaceFolders) {
        return vscode.workspace.workspaceFolders.length > 1;
    }
    return false;
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
        const rootPath = getRoot(uri) || '';
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
                        r = fileMeta[key] ? `**/*${fileMeta[key]}` : undefined;
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
            if (fileMeta["dirname"]) {
                if (fileMeta["extname"]) {
                    glob.push(`${fileMeta["dirname"]}/*${fileMeta["extname"]}`);
                }
            } else {
                if (fileMeta["extname"]) {
                    glob.push(`*${fileMeta["extname"]}`);
                }
            }

            if (fileMeta["basename"]) {
                glob.push(`**/${fileMeta["basename"]}`);
                if (fileMeta["dirname"]) {
                    glob.push(`${fileMeta["dirname"]}/${fileMeta["basename"]}`);
                }
            }
            result = await shouldShowPicker(glob);
        } else if (isFolder) {
            result = [`${fileMeta.basename}`];
        }
        if (result) {
            flushConf("files.exclude", result, isGlobal, uri);
        }
    } catch (error) {
        vscode.window.showErrorMessage(error.message || error);
    }
}

/**
 * get real root path for multiRoot
 * @author YoRolling
 * @version 1.2.0
 * @param {vscode.Uri} uri file uri
 * @returns {string}
 */
function getRoot(uri: vscode.Uri): string {
    if (isMultiRoot() && vscode.workspace.workspaceFolders) {
        let matchRoot: string[] = vscode.workspace.workspaceFolders
            .filter((wf: vscode.WorkspaceFolder) => {
                return isParentPath(uri.fsPath, wf.uri.fsPath);
            })
            .map(v => v.uri.fsPath);
        return matchRoot[0];
    } else {
        return rootPath || "";
    }
}

/**
 * get extension configurations
 * @author YoRolling
 * @version 1.2.0
 * @returns {vscode.WorkspaceConfiguration}
 */
function getExtenstionConfig(uri: vscode.Uri): vscode.WorkspaceConfiguration {
    const config = vscode.workspace.getConfiguration("excludeIt", uri);
    console.log('config', JSON.stringify(config));
    return config;
}

/**
 *  
 * @author YoRolling
 * @version 1.2.0
 * @param {string} source
 * @param {string} target
 * @returns {boolean}
 */
function isParentPath(source: string, target: string): boolean {
    return subdir(target, source);
}