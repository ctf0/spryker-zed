import {
    CodeLens,
    CodeLensProvider,
    TextDocument,
    window
} from 'vscode';
import * as util from '../util';

export default class PhpLensProvider implements CodeLensProvider {
    async provideCodeLenses(doc: TextDocument): Promise<CodeLens[]> {
        const editor = window.activeTextEditor;
        const links: any = [];

        if (editor) {
            const { uri } = doc;
            util.setWs(uri);

            const currentFile = uri.path;
            const viewFileExists = false
            const range = new Range();

            if (file && range) {
                if (viewFileExists) {
                    links.push(
                        new CodeLens(range, {
                            command: 'szed.goToView',
                            title: 'open view file',
                            arguments: [file],
                        }),
                    );
                } else {
                    links.push(
                        new CodeLens(range, {
                            command: 'szed.createView',
                            title: 'create a view file',
                            arguments: [file],
                        }),
                    );
                }
            }
        }

        return links;
    }
}
