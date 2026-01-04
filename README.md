# dotfiles

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/) for macOS.

## Setup

```sh
# Install chezmoi and apply dotfiles
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply ghost
```

## What's Included

### Shell
- **zsh** - Shell configuration with zinit plugin manager
- **starship** - Cross-shell prompt

### Terminal Emulators
- ghostty
- alacritty
- kitty
- wezterm
- iTerm2

### Editors
- **neovim** - Primary editor
- **vim** - `.vimrc` for basic vim usage
- **ideavim** - JetBrains IDE vim emulation

### CLI Tools
- bat, eza, fd, fzf, ripgrep - Modern unix utilities
- yazi - Terminal file manager
- lazygit - Git TUI
- tmux - Terminal multiplexer
- aria2 - Download utility

### macOS
- karabiner - Keyboard customization (with karabiner.ts)
- aerospace - Tiling window manager
- raycast, rectangle, homerow - Productivity tools

### Development
- Brewfile - Homebrew dependencies
- git config
- Various language/tool configs

## Structure

```
.
├── Brewfile              # Homebrew dependencies
├── dot_zshrc             # Zsh configuration
├── dot_vimrc             # Vim configuration
├── dot_config/           # ~/.config/ contents
│   ├── nvim/             # Neovim
│   ├── ghostty/          # Ghostty terminal
│   ├── karabiner/        # Keyboard customization
│   ├── starship.toml     # Prompt
│   └── ...
└── encrypted_*.asc       # GPG-encrypted secrets
```

## Usage

```sh
# Pull and apply latest changes
chezmoi update

# Edit a managed file
chezmoi edit ~/.zshrc

# Add a new file to management
chezmoi add ~/.config/some/file

# See what would change
chezmoi diff
```
