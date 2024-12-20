import debounce from 'lodash.debounce';
import {
    commands,
    ExtensionContext,
    languages,
    window,
    workspace
} from 'vscode';
import * as cmnds from './cmnds';
import PhpLensProvider from './providers/PhpLensProvider';
import * as util from './util';

let providers: any = [];

export async function activate(context: ExtensionContext) {
    util.readConfig();

    // config
    workspace.onDidChangeConfiguration((e) => {
        if (e.affectsConfiguration(util.PACKAGE_NAME)) {
            util.readConfig();
        }
    });

    // command
    context.subscriptions.push(
        commands.registerCommand('szed.goToView', cmnds.goToView),
        commands.registerCommand('szed.createView', cmnds.createView),
        commands.registerCommand('szed.openUrl', cmnds.openUrl),
    );

    // links
    initProviders();
    context.subscriptions.push(
        window.onDidChangeActiveTextEditor(async (e) => {
            await clearAll();
            initProviders();
        }),
    );

    // create
    cmnds.resetLinks.event(async () => {
        await clearAll();
        initProviders();
    });
}

const initProviders = debounce(() => {
    if (util.config.showCodeLens) {
        providers.push(languages.registerCodeLensProvider(['php'], new PhpLensProvider()));
    }
}, 250);

function clearAll() {
    return new Promise((res, rej) => {
        providers.map((e) => e.dispose());
        providers = [];

        setTimeout(() => res(true), 500);
    });
}

export function deactivate() {
    clearAll();
}
