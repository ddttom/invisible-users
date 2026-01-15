# VS Code Extension Cleanup Recommendations

This document provides guidance on managing VS Code extensions for this project. You currently have 200+ extensions installed, which can impact performance and cause conflicts.

## Extension Audit Summary

Your installed extensions were analyzed for relevance to this Node.js/Markdown project. Many extensions are language-specific tools for languages not used in this codebase.

## Recommended Extensions (Keep Enabled)

These extensions are essential for this project and are listed in [.vscode/extensions.json](../.vscode/extensions.json):

### Core Development
- `anthropic.claude-code` - Claude Code integration
- `dbaeumer.vscode-eslint` - ESLint for Web Audit Suite
- `davidanson.vscode-markdownlint` - Markdown linting
- `esbenp.prettier-vscode` - Code formatting
- `editorconfig.editorconfig` - EditorConfig support

### Markdown Editing
- `yzhang.markdown-all-in-one` - Markdown shortcuts and tools
- `bierner.markdown-emoji` - Emoji support in Markdown
- `bierner.markdown-mermaid` - Mermaid diagram support
- `shd101wyy.markdown-preview-enhanced` - Enhanced markdown preview

### Git Integration
- `eamodio.gitlens` - Advanced Git integration
- `donjayamanne.githistory` - Git history visualization
- `mhutchie.git-graph` - Git graph visualization

### Development Tools
- `ms-vscode.live-server` - Live preview for HTML appendices
- `christian-kohler.path-intellisense` - Path autocomplete
- `christian-kohler.npm-intellisense` - npm package autocomplete
- `usernamehw.errorlens` - Inline error visualization
- `gruntfuggly.todo-tree` - TODO tracking

### Visualization
- `grapecity.gc-excelviewer` - CSV/Excel viewing (for Web Audit Suite reports)
- `meezilla.json` - JSON visualization
- `oderwat.indent-rainbow` - Better indentation visibility
- `vscode-icons-team.vscode-icons` - File icons

## Extensions to Disable for This Workspace

These extensions are not relevant to this Node.js/Markdown project and should be disabled workspace-wide:

### Java Development (Not Used)
- `vscjava.vscode-java-pack`
- `vscjava.vscode-java-debug`
- `vscjava.vscode-java-dependency`
- `vscjava.vscode-java-test`
- `vscjava.vscode-maven`
- `vscjava.vscode-gradle`
- `redhat.java`
- `corecipher.maven-for-java`
- `dhruv.maven-dependency-explorer`

### .NET/C# Development (Not Used)
- `ms-dotnettools.csdevkit`
- `ms-dotnettools.csharp`
- `ms-dotnettools.vscode-dotnet-runtime`
- `wivuu.dotnetscriptr`

### PHP Development (Not Used)
- `devsense.phptools-vscode`
- `devsense.intelli-php-vscode`
- `devsense.composer-php-vscode`
- `devsense.profiler-php-vscode`
- `bmewburn.vscode-intelephense-client`
- `bschulte.php-autocomplete`
- `xdebug.php-debug`
- `xdebug.php-pack`
- `zobo.php-intellisense`
- `hakcorp.php-awesome-snippets`
- `phiter.phpstorm-snippets`
- `junstyle.php-cs-fixer`
- `kokororin.vscode-phpfmt`
- `mehedidracula.php-namespace-resolver`
- `wongjn.php-sniffer`
- `marabesi.php-import-checker`
- `valeryanm.vscode-phpsab`
- `brapifra.phpserver`
- `primafuture.open-php-html-js-in-browser`
- `rifi2k.format-html-in-php`

### Swift/Xcode Development (Not Used)
- `swiftlang.swift-vscode`
- `alishobeiri.swift-development`
- `dunstontc.vscode-swift-syntax`
- `gfreezy.xcode-pal`
- `sweetpad.sweetpad`
- `viktorproduction.xcode-integration`
- `squarelogic.open-xcode-project`
- `mhcpnl.xcodestrings`
- `mariomatheu.syntax-project-pbxproj`

### Python Development (Minimal Use)
- `ms-python.python`
- `ms-python.vscode-pylance`
- `ms-python.debugpy`
- `ms-python.vscode-python-envs`

### Adobe Experience Manager (Not Used)
- `mansquatch.aem-component-builder`
- `mansquatch.create-aem-clientlib`
- `misonou.aemexplorer`
- `olmanslm.htl-for-vscode`
- `yamato-ltd.vscode-aem-sync`
- `yinkai15.aemsync`

### Other Specialized Tools (Not Needed)
- `dsanders11.vscode-electron-build-tools` - Electron development
- `firefox-devtools.vscode-firefox-debug` - Firefox debugging
- `google.vscode-mojom` - Chrome/Mojo development
- `llvm-vs-code-extensions.lldb-dap` - LLDB debugging
- `ms-vscode.cmake-tools` - CMake projects
- `ms-vscode.makefile-tools` - Makefile projects
- `ziglang.vscode-zig` - Zig language

### Duplicate AI Assistants (Already Have Claude Code)
- `github.copilot` - GitHub Copilot
- `github.copilot-chat` - GitHub Copilot Chat
- `google.geminicodeassist` - Gemini Code Assist
- `genieai.chatgpt-vscode` - ChatGPT
- `tabnine.tabnine-vscode` - Tabnine
- `codeparrot-ai.codeparrot` - Code Parrot
- `phind.phind` - Phind
- `kingleo.qwen` - Qwen
- `duoc95.ask-claude` - Duplicate Claude extension
- `benbasha.claude-autopilot` - Duplicate Claude extension
- `saoudrizwan.claude-dev` - Duplicate Claude extension
- `juanlb.claude-commit` - Duplicate Claude extension
- `jasonmcghee.claude-debugs-for-you` - Duplicate Claude extension

## How to Disable Extensions for This Workspace

1. Open VS Code in this workspace
2. Go to Extensions view (Cmd+Shift+X)
3. For each extension to disable:
   - Right-click the extension
   - Select "Disable (Workspace)"

This keeps the extension installed globally but disables it for this specific project.

## Performance Impact

Disabling unnecessary extensions can significantly improve:
- **Startup time**: Fewer extensions to load on launch
- **Memory usage**: Less RAM consumed by inactive language servers
- **Responsiveness**: Fewer background processes competing for resources
- **Stability**: Reduced chance of extension conflicts

## Alternative: Extension Profiles (VS Code 1.85+)

If you're using VS Code 1.85 or later, consider using Extension Profiles:

1. Create a profile for this project: "Invisible Users Development"
2. Enable only the recommended extensions
3. Switch profiles when working on different projects

This approach maintains separate extension configurations without manually enabling/disabling extensions.

## Regular Maintenance

Periodically review installed extensions:
- Uninstall extensions you never use
- Check for updated versions of active extensions
- Remove duplicate functionality extensions
- Verify extensions are compatible with current VS Code version

## Questions?

If you're unsure about disabling a specific extension:
- Check the extension's marketplace page for use cases
- Verify it's not used by any npm scripts in package.json
- Test disabling it and see if your workflow is affected
- Re-enable if needed

Remember: You can always re-enable an extension if you find you need it!
