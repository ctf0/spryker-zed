import {
    commands,
    EventEmitter,
    Position,
    Uri,
    window,
    workspace,
    WorkspaceEdit
} from 'vscode';

export const resetLinks = new EventEmitter();

// on action
export function goToView(args) {
    if (args == undefined) {
        return
    }

    let { path } = args
    const file = Uri.file(path);
    return openFile(file);
}

function openFile(file: Uri) {
    return commands.executeCommand('vscode.open', file);
}

// on action
export async function createView(args) {
    if (args == undefined) {
        return
    }

    let { path } = args
    const file = Uri.file(path);
    const edit = new WorkspaceEdit();
    edit.createFile(file); // open or create new file

    const defVal = util.config.viewDefaultValue;

    if (defVal) {
        edit.insert(file, new Position(0, 0), defVal);
    }

    await workspace.applyEdit(edit);

    window.showInformationMessage(`Spryker Zed: "${path}" created`);
    resetLinks.fire(resetLinks);

    if (util.config.activateViewAfterCreation) {
        return commands.executeCommand('vscode.open', file);
    }
}

// on controller
export function openUrl(args) {
    if (args == undefined) {
        return
    }

    let { path } = args
    const url = Uri.parse(`${util.config.appUrl}${path}`);
    return commands.executeCommand('vscode.open', url);
}
