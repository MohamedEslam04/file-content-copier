# File Content Copier

Copy file contents with relative paths to clipboard.

## Features

- **Multiple Selection**: Select multiple files/folders with Ctrl/Cmd+Click
- **Range Selection**: Select range with Shift+Click
- **Right-Click Menu**: Available in Explorer context menu
- **Command Palette**: Access via Ctrl+Shift+P

## Usage

### From Explorer:
1. Select one or multiple files/folders in Explorer
2. Right-click → "File Copier: Copy Selected Files"

### From Command Palette:
- `Ctrl+Shift+P` → "File Copier: Copy All Files in Workspace"

## Output Format

```
File: path/to/file1.ts

[file content]

================================================================================

File: path/to/file2.ts

[file content]

================================================================================
```