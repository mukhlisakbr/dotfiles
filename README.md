# dotfiles

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/) for macOS.

## Setup

```sh
# 1. Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Bitwarden CLI (untuk decrypt secrets)
brew install bitwarden-cli
bw login

# 3. Install chezmoi via brew dan apply dotfiles
brew install chezmoi
chezmoi init --apply mukhlisakbr
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
- **Key Repeat** - Fast key repeat settings (see below)
- **Dock Animation** - Fast dock show/hide (see below)
- **Trackpad/Mouse Speed** - Custom tracking speed (see below)
- **Trackpad Gestures** - Tap to click & 3 finger dragging (see below)

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

## macOS Key Repeat

Enable fast key repeat untuk Ghostty dan VS Code:

```sh
# Disable press-and-hold untuk accent characters
defaults write com.mitchellh.ghostty ApplePressAndHoldEnabled -bool false
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# Set key repeat ke nilai tercepat
defaults write -g KeyRepeat -int 1
defaults write -g InitialKeyRepeat -int 10
```

Logout dan login kembali setelah menjalankan command di atas.

## macOS Dock Animation

Percepat animasi dock show/hide:

```sh
# Hilangkan delay sebelum dock muncul
defaults write com.apple.dock autohide-delay -float 0

# Percepat animasi show/hide
defaults write com.apple.dock autohide-time-modifier -float 0.15

# Restart dock
killall Dock
```

## macOS Trackpad & Mouse Speed

Set tracking speed (range: 0-3, higher = faster):

```sh
# Trackpad speed
defaults write -g com.apple.trackpad.scaling -float 0.875

# Mouse speed
defaults write -g com.apple.mouse.scaling -float 0.875
```

Logout dan login kembali setelah menjalankan command di atas.

## macOS Trackpad Gestures

Enable tap to click dan 3 finger dragging:

```sh
# Tap to click
defaults write com.apple.AppleMultitouchTrackpad Clicking -bool true

# 3 finger dragging
defaults write com.apple.AppleMultitouchTrackpad TrackpadThreeFingerDrag -bool true
```

Logout dan login kembali setelah menjalankan command di atas.
