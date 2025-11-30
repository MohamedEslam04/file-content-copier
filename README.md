# Files Content Copier

Effortlessly copy the contents of multiple files and folders in your workspace to the clipboard, including their relative paths.

![Demo](https://raw.githubusercontent.com/MohamedEslam04/file-content-copier/main/public/demo.gif)

---

## 📦 Features

- **Copy Multiple Files/Folders**: Select several files or folders at once (Ctrl/Cmd+Click)
- **Range Selection**: Quickly select consecutive files with Shift+Click
- **Explorer Context Menu**: Right-click in VS Code Explorer for instant access
- **Command Palette**: Invoke commands from Ctrl+Shift+P for workspace-wide copying
- **Smart Output**: Each file is separated and labeled by its relative path

---

## 🚀 How to Use

### Method 1: From Explorer

1. In the VS Code Explorer, select one or more files or folders (use Ctrl/Cmd or Shift for multi-selection)
2. Right-click and choose: **File Copier: Copy Selected Files**
3. All selected file contents (recursively, for folders) are now on your clipboard, organized by file paths

### Method 2: From Command Palette

- Open the palette with `Ctrl+Shift+P`
- Run **File Copier: Copy All Files in Workspace**
- All files in your project (excluding node_modules, .git, dist, build, etc.) will be copied, with paths and contents, to your clipboard

---

## 📝 Output Format

The clipboard output will look like:

```
File: src/app.js
----------------------------------------------------------------------
[contents of src/app.js]
----------------------------------------------------------------------

File: src/utils/helper.ts
----------------------------------------------------------------------
[contents of src/utils/helper.ts]
----------------------------------------------------------------------

...
```

---

## 💡 Tip

- Binary files or files that can't be read are automatically skipped.
- Output separators make it easy to distinguish contents for each file.

---
