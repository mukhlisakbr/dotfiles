# dotfiles

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/) for macOS.

## Setup

```sh
# 1. Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Bitwarden CLI (for decrypting secrets)
brew install bitwarden-cli
bw login

# 3. Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 4. Install chezmoi and apply dotfiles
brew install chezmoi
chezmoi init --apply mukhlisakbr

# 5. Install dependencies from Brewfile
brew bundle -v

# 6. Install runtime tools via mise (node, bun, etc.)
mise install
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

### AI Coding Tools
- **claude** - Claude Code CLI
- **opencode** - OpenCode CLI

### Other
- Sublime Text - Editor settings
- vimium - Browser vim extension
- mise - Version manager
- karabiner - Keyboard customization (with karabiner.ts)

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

## macOS Settings

Optional settings to configure after setup. Logout and login after running these commands.

### Key Repeat

Enable fast key repeat for Ghostty and VS Code:

```sh
# Disable press-and-hold for accent characters
defaults write com.mitchellh.ghostty ApplePressAndHoldEnabled -bool false
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# Set key repeat to fastest
defaults write -g KeyRepeat -int 1
defaults write -g InitialKeyRepeat -int 10
```

### Dock Animation

Speed up dock show/hide animation:

```sh
# Remove delay before dock appears
defaults write com.apple.dock autohide-delay -float 0

# Speed up animation
defaults write com.apple.dock autohide-time-modifier -float 0.15

# Restart dock
killall Dock
```

### Dock Tilesize

Set fixed icon size untuk dock:

```sh
# Set dock icon size to 36 pixels
defaults write com.apple.dock tilesize -int 36

# Restart dock
killall Dock
```

### Trackpad & Mouse Speed

Set tracking speed (range: 0-3, higher = faster):

```sh
defaults write -g com.apple.trackpad.scaling -float 0.875
defaults write -g com.apple.mouse.scaling -float 0.875
```

### Trackpad Gestures

Enable tap to click and 3 finger dragging:

```sh
defaults write com.apple.AppleMultitouchTrackpad Clicking -bool true
defaults write com.apple.AppleMultitouchTrackpad TrackpadThreeFingerDrag -bool true

# Enable App Exposé with four finger swipe down
defaults write com.apple.dock showAppExposeGestureEnabled -bool true
defaults write com.apple.AppleMultitouchTrackpad TrackpadFourFingerVertSwipeGesture -int 2
killall Dock
```

### Trackpad Click

Set light click pressure dan enable silent clicking:

```sh
# Set click pressure to light (0=light, 1=medium, 2=firm)
defaults write com.apple.AppleMultitouchTrackpad FirstClickThreshold -int 0
defaults write com.apple.AppleMultitouchTrackpad SecondClickThreshold -int 0

# Enable silent/quiet clicking
defaults write com.apple.AppleMultitouchTrackpad ActuationStrength -int 0
```

### Startup Sound

Disable startup chime via **System Settings → Sound → uncheck "Play sound on startup"**.
