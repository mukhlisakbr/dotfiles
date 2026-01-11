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

### Terminal
- **ghostty** - Primary terminal emulator

### Editors
- **neovim** - Primary editor (LazyVim)
- **vim** - `.vimrc` for basic vim usage

### CLI Tools
- bat, eza, fd, fzf, ripgrep - Modern unix utilities
- yazi - Terminal file manager
- tmux - Terminal multiplexer
- aria2 - Download utility

### macOS
- **karabiner** - Keyboard customization (with karabiner.ts)

### AI Coding Tools
- **claude** - Claude Code CLI
- **opencode** - OpenCode CLI

### Other
- Sublime Text - Editor settings
- vimium - Browser vim extension
- mise - Version manager

## Structure

```
.
├── Brewfile                    # Homebrew dependencies
├── dot_zshrc                   # Zsh configuration
├── dot_zprofile                # Zsh profile
├── dot_vimrc                   # Vim configuration
├── dot_config/
│   ├── nvim/                   # Neovim (LazyVim)
│   ├── ghostty/                # Ghostty terminal
│   ├── karabiner/              # Keyboard customization
│   ├── starship.toml           # Prompt
│   ├── bat/                    # bat config & themes
│   ├── eza/                    # eza theme
│   ├── fd/                     # fd ignore
│   ├── yazi/                   # File manager
│   ├── tmux/                   # Terminal multiplexer
│   ├── aria2/                  # Download manager
│   ├── mise/                   # Version manager
│   ├── opencode/               # OpenCode CLI
│   └── git/                    # Global gitignore
├── dot_claude/                 # Claude Code settings
├── dot_ssh/                    # SSH config (encrypted)
├── private_dot_gitconfig       # Git configuration
├── private_Library/            # Sublime Text settings
└── encrypted_*.asc             # GPG-encrypted secrets
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

# Remove a file from management (source + target)
chezmoi forget ~/.some/file && rm ~/.some/file
```
