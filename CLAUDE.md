# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Chezmoi-managed dotfiles repository for macOS. Chezmoi naming conventions:
- `dot_` → `.` (hidden files)
- `private_` → restricted permissions
- `encrypted_*.asc` → GPG-encrypted (decrypted via Bitwarden)
- `empty_` → creates empty files

## Common Commands

```sh
# Apply dotfiles to home directory
chezmoi apply

# Check for unsynced changes between target and source
chezmoi diff

# Sync target changes back to source (after editing files directly)
chezmoi re-add ~/.path/to/file

# Add new file to chezmoi management
chezmoi add ~/.path/to/file

# Install/update Homebrew dependencies
brew bundle install -g
brew bundle dump -g --force --no-vscode

# Install runtime tools (node, bun, java)
mise install
```

## Architecture

### Configuration Targets

| Directory | Target | Purpose |
|-----------|--------|---------|
| `dot_zshrc`, `dot_zprofile` | `~/.zshrc`, `~/.zprofile` | Shell configuration |
| `dot_config/nvim/` | `~/.config/nvim/` | LazyVim (Neovim) |
| `dot_config/ghostty/` | `~/.config/ghostty/` | Terminal emulator |
| `dot_config/karabiner/` | `~/.config/karabiner/` | Keyboard customization (TypeScript-based) |
| `dot_claude/` | `~/.claude/` | Claude Code global settings |
| `private_dot_gitconfig` | `~/.gitconfig` | Git configuration |

### Encrypted Files

Files ending in `.asc` are GPG-encrypted and require Bitwarden CLI to be logged in for decryption. The encryption key is retrieved automatically via `bw get password`.

### Karabiner Configuration

Located at `dot_config/karabiner/`, uses TypeScript with the `karabiner.ts` library:
```sh
cd ~/.config/karabiner
bun install
bun run build  # Generates karabiner.json
```

## Theming

Consistent Dracula/Catppuccin theming across tools:
- Ghostty: Dracula theme
- Neovim: Tokyo Night
- Vim: Catppuccin Mocha
- Git delta: Catppuccin Mocha
- fzf: Dracula colors

## Web Search

Gunakan `mcp__exa__web_search_exa` untuk pencarian web, bukan WebSearch built-in.
