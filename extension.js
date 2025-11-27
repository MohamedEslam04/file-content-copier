const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    // Command 1: Copy all files in workspace
    let copyAllCommand = vscode.commands.registerCommand('fileCopier.copyAllFiles', async function () {
        await copyFiles();
    });

    // Command 2: Copy files from selected folder or multiple files
    let copySelectedCommand = vscode.commands.registerCommand('fileCopier.copySelectedFiles', async function (uri, allUris) {
        // allUris contains all selected files/folders when multiple selection
        const selectedUris = allUris && allUris.length > 0 ? allUris : [uri];
        await copySelectedItems(selectedUris);
    });

    context.subscriptions.push(copyAllCommand, copySelectedCommand);
}

async function copySelectedItems(selectedUris) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open');
        return;
    }

    try {
        let allFiles = [];

        // Process each selected item (file or folder)
        for (const uri of selectedUris) {
            const stat = fs.statSync(uri.fsPath);
            
            if (stat.isDirectory()) {
                // If it's a folder, get all files inside
                const relativePath = path.relative(workspaceFolder.uri.fsPath, uri.fsPath);
                const searchPattern = relativePath ? `${relativePath}/**/*` : '**/*';
                const files = await vscode.workspace.findFiles(
                    searchPattern,
                    '**/node_modules/**,**/.git/**,**/dist/**,**/build/**,**/.vscode/**'
                );
                allFiles.push(...files);
            } else {
                // If it's a file, add it directly
                allFiles.push(uri);
            }
        }

        if (allFiles.length === 0) {
            vscode.window.showWarningMessage('No files found to copy');
            return;
        }

        // Remove duplicates
        allFiles = [...new Set(allFiles.map(f => f.fsPath))].map(f => vscode.Uri.file(f));

        let output = '';
        const separator = '\n' + '='.repeat(80) + '\n\n';
        let copiedCount = 0;

        for (const fileUri of allFiles) {
            const relativePath = path.relative(workspaceFolder.uri.fsPath, fileUri.fsPath);
            
            try {
                const content = fs.readFileSync(fileUri.fsPath, 'utf8');
                output += `File: ${relativePath}\n\n`;
                output += content;
                output += separator;
                copiedCount++;
            } catch (err) {
                // Skip binary files or files that can't be read
                console.log(`Skipped: ${relativePath}`);
            }
        }

        // Copy to clipboard
        await vscode.env.clipboard.writeText(output);
        
        const itemCount = selectedUris.length;
        const itemWord = itemCount === 1 ? 'item' : 'items';
        vscode.window.showInformationMessage(`✓ Copied ${copiedCount} files from ${itemCount} selected ${itemWord} to clipboard!`);

    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

async function copyFiles(folderUri) {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder open');
        return;
    }

    try {
        // Get all files in workspace
        const files = await vscode.workspace.findFiles(
            '**/*',
            '**/node_modules/**,**/.git/**,**/dist/**,**/build/**,**/.vscode/**'
        );

        if (files.length === 0) {
            vscode.window.showWarningMessage('No files found to copy');
            return;
        }

        let output = '';
        const separator = '\n' + '='.repeat(80) + '\n\n';
        let copiedCount = 0;

        for (const fileUri of files) {
            const relativePath = path.relative(workspaceFolder.uri.fsPath, fileUri.fsPath);
            
            try {
                const content = fs.readFileSync(fileUri.fsPath, 'utf8');
                output += `File: ${relativePath}\n\n`;
                output += content;
                output += separator;
                copiedCount++;
            } catch (err) {
                // Skip binary files or files that can't be read
                console.log(`Skipped: ${relativePath}`);
            }
        }

        // Copy to clipboard
        await vscode.env.clipboard.writeText(output);
        vscode.window.showInformationMessage(`✓ Copied ${copiedCount} files from workspace to clipboard!`);

    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};