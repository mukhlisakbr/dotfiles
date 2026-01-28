# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Chezmoi-managed dotfiles repository for macOS. Chezmoi naming conventions:
- `dot_` → `.` (hidden files)
- `private_` → restricted permissions
- `encrypted_*.asc` → GPG-encrypted (decrypted via Bitwarden)
- `empty_` → creates empty files

Auto-commit and auto-push are enabled in `.chezmoi.toml.tmpl`.

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

# Remove file from chezmoi (source and target)
chezmoi destroy ~/.path/to/file

# Pull and apply from remote
chezmoi update

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
| `dot_config/mise/` | `~/.config/mise/` | Runtime versions (node, bun, java) |
| `dot_config/starship.toml` | `~/.config/starship.toml` | Shell prompt |
| `dot_config/tmux/` | `~/.config/tmux/` | Terminal multiplexer |
| `dot_config/lazygit/` | `~/.config/lazygit/` | Git TUI client |
| `dot_config/yazi/` | `~/.config/yazi/` | Terminal file manager |
| `dot_config/aria2/` | `~/.config/aria2/` | Download manager |
| `dot_config/fd/` | `~/.config/fd/` | Fast find alternative |
| `dot_config/opencode/` | `~/.config/opencode/` | OpenCode AI assistant |
| `dot_config/private_git/` | `~/.config/git/` | Git global config |
| `dot_claude/` | `~/.claude/` | Claude Code global settings |
| `dot_ssh/` | `~/.ssh/` | SSH configuration (encrypted) |
| `private_dot_gitconfig` | `~/.gitconfig` | Git configuration |

### Encrypted Files

Files ending in `.asc` are GPG-encrypted and require Bitwarden CLI to be logged in for decryption. The encryption key is retrieved automatically via `bw get password`.
