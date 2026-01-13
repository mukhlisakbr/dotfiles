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
brew bundle install -g -v

# 6. Install runtime tools via mise (node, bun, etc.)
mise install
```

## What's Included

| Category | Tools |
|----------|-------|
| Shell | zsh (zinit), starship prompt |
| Terminal | ghostty |
| Editors | neovim (LazyVim), vim |
| CLI | bat, eza, fd, fzf, ripgrep, yazi, tmux, aria2 |
| AI Coding | Claude Code, OpenCode |
| Other | Sublime Text, vimium, mise, karabiner |

## Structure

```
.
├── dot_Brewfile                # Homebrew dependencies (~/.Brewfile)
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
│   ├── vimium/                 # Browser vim extension
│   └── git/                    # Global gitignore
├── dot_claude/                 # Claude Code settings
├── dot_ssh/                    # SSH config
├── private_dot_gitconfig       # Git configuration
├── private_Library/            # Sublime Text settings
└── encrypted_*.asc             # GPG-encrypted secrets
```

## Usage

### Brewfile

Brewfile is stored at `~/.Brewfile` (global). Use `-g` flag for all operations:

```sh
brew bundle install -g                   # Install dependencies
brew bundle dump -g --force --no-vscode  # Update Brewfile (skip vscode)
brew bundle check -g                     # Verify all installed
brew bundle list -g                      # List dependencies
```

> VS Code extensions are skipped since Settings Sync is used instead.

### Chezmoi

```sh
chezmoi add ~/.config/some/file     # Add a new file
chezmoi diff                        # Check for unsynced changes
chezmoi re-add ~/.zshrc             # Sync target changes back to source
chezmoi destroy ~/.some/file        # Remove from source and target
chezmoi update                      # Pull and apply from remote
```

> Workflow: Edit files directly at target location, then use `chezmoi diff` to check and `chezmoi re-add` to sync.

## macOS Settings

Optional settings. Logout/login after running these commands.

### Keyboard

```sh
# Fast key repeat for Ghostty and VS Code
defaults write com.mitchellh.ghostty ApplePressAndHoldEnabled -bool false
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
defaults write -g KeyRepeat -int 1
defaults write -g InitialKeyRepeat -int 10
```

### Dock

```sh
# Fast animation + icon size + App Exposé gesture
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.15
defaults write com.apple.dock tilesize -int 36
defaults write com.apple.dock showAppExposeGestureEnabled -bool true
killall Dock
```

### Trackpad & Mouse

```sh
# Tap to click + 3 finger drag + 4 finger swipe for App Exposé
defaults write com.apple.AppleMultitouchTrackpad Clicking -bool true
defaults write com.apple.AppleMultitouchTrackpad TrackpadThreeFingerDrag -bool true
defaults write com.apple.AppleMultitouchTrackpad TrackpadFourFingerVertSwipeGesture -int 2

# Light + quiet click
defaults write com.apple.AppleMultitouchTrackpad FirstClickThreshold -int 0
defaults write com.apple.AppleMultitouchTrackpad SecondClickThreshold -int 0
defaults write com.apple.AppleMultitouchTrackpad ActuationStrength -int 0

# Tracking speed (0-3)
defaults write -g com.apple.trackpad.scaling -float 0.875
defaults write -g com.apple.mouse.scaling -float 0.875
```

### Other

- **Startup Sound**: System Settings → Sound → uncheck "Play sound on startup"
