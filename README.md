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

# 7. Install vim-plug for Vim
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
vim +PlugInstall +qall
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

Logout/restart may be required after changes.

### Via Terminal

```sh
# Keyboard: disable press-and-hold (hidden setting, enables key repeat in these apps)
defaults write com.mitchellh.ghostty ApplePressAndHoldEnabled -bool false
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false

# Keyboard: key repeat + initial delay (faster than UI slider allows)
defaults write -g KeyRepeat -int 1
defaults write -g InitialKeyRepeat -int 10

# Dock: instant auto-hide + precise icon size
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.15
defaults write com.apple.dock tilesize -int 42
killall Dock
```

### Via System Settings

| Path                                                          | Value                        |
| ------------------------------------------------------------- | ---------------------------- |
| Trackpad → Tracking speed                                     | 5th notch                    |
| Trackpad → Click                                              | Light                        |
| Trackpad → Quiet Click                                        | On                           |
| Trackpad → Tap to click                                       | On                           |
| Trackpad → More Gestures → App Exposé                         | Swipe Down with Four Fingers |
| Mouse → Tracking speed                                        | 5th notch                    |
| Accessibility → Pointer Control → Trackpad Options → Dragging | Three Finger Drag            |
| Sound → Play sound on startup                                 | Off                          |

## Keyboard Shortcuts

Custom shortcuts via [Superkey](https://superkey.app/).

| Trigger             | Action            |
| ------------------- | ----------------- |
| Caps Lock (hold)    | Left Control      |
| Caps Lock (tap)     | Escape            |
| Caps Lock + H/J/K/L | ←↓↑→ (Arrow keys) |
| Double tap Shift    | Caps Lock         |
| ⇧⌘K                 | Toggle Seek       |
