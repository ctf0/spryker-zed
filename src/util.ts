import { workspace, WorkspaceConfiguration } from 'vscode';

const path = require('path');
export const sep = path.sep;
let ws;

export function setWs(uri) {
    ws = workspace.getWorkspaceFolder(uri)?.uri.fsPath;
}

export function getDocFullPath(path, add = true) {
    return add
        ? replaceSlash(`${ws}/${path}`)
        : path.replace(replaceSlash(`${ws}/`), '');
}

/* Helpers ------------------------------------------------------------------ */

function checkCache(cache_store, text) {
    const check = cache_store.find((e) => e.key == text);

    return check ? check.val : [];
}

function saveCache(cache_store, text, val) {
    checkCache(cache_store, text).length
        ? false
        : cache_store.push({
            key: text,
            val: val,
        });

    return val;
}

function replaceSlash(item) {
    return item.replace(/[\\/]+/g, sep);
}

export function getModuleStartingPath(str) {
    return str.replace(/.*Zed[\\/]/, '');
}



/* Config ------------------------------------------------------------------- */
export const PACKAGE_NAME = 'sprykerZed';

export let config: WorkspaceConfiguration;

export async function readConfig() {
    config = workspace.getConfiguration(PACKAGE_NAME);
}
