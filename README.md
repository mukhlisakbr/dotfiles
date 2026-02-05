# dotfiles

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/) for macOS.

## Setup

### 0. Enable Terminal App Management

Required for installing some apps (e.g., ExpressVPN) that need terminal automation access.

System Settings → Privacy & Security → App Management → Terminal → On

### 1. Install Homebrew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 2. Install Bitwarden CLI

```sh
brew install bitwarden-cli
bw login
```

### 3. Install oh-my-zsh

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 4. Install GPG

Required for decrypting secrets in chezmoi.

```sh
brew install gpg
```

### 5. Install chezmoi & apply dotfiles

```sh
brew install chezmoi
chezmoi init --apply mukhlisakbr
```

### 6. Install Homebrew dependencies

```sh
brew bundle install -g -v
```

### 7. Install runtime tools (mise)

```sh
mise install
```

### 8. Install vim-plug & plugins

```sh
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
  https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
vim -es -u ~/.vimrc -i NONE -c "PlugInstall" -c "qa"
```

## macOS Settings

Logout/restart may be required after changes.

### Via Terminal

Disable press-and-hold untuk enable key repeat di apps tertentu:

```sh
defaults write com.mitchellh.ghostty ApplePressAndHoldEnabled -bool false
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

Key repeat & initial delay (lebih cepat dari UI slider):

```sh
defaults write -g KeyRepeat -int 1
defaults write -g InitialKeyRepeat -int 10
```

Dock auto-hide instant & icon size:

```sh
defaults write com.apple.dock autohide-delay -float 0
defaults write com.apple.dock autohide-time-modifier -float 0.15
defaults write com.apple.dock tilesize -int 42
killall Dock
```

### Via System Settings

| Path                                                          | Value                           |
| ------------------------------------------------------------- | ------------------------------- |
| Trackpad → Tracking speed                                     | 5th notch                       |
| Trackpad → Click                                              | Light                           |
| Trackpad → Quiet Click                                        | On                              |
| Trackpad → Tap to click                                       | On                              |
| Trackpad → More Gestures → App Exposé                         | Swipe Down with Four Fingers    |
| Mouse → Tracking speed                                        | 5th notch                       |
| Accessibility → Pointer Control → Trackpad Options            | Use trackpad for dragging, Dragging style: Three Finger Drag |
| Sound → Play sound on startup                                 | Off                             |
| Menu Bar → Spotlight                                          | Don't Show in Menu Bar          |
| Menu Bar → Clock Options                                       | Show Date: Never, Show the Day of the Week: Off |
| Displays → Resolution                                         | More Space                      |
| Displays → Night Shift → Schedule                             | Custom: 00:00 to 23:59          |
| Finder → Settings → General → New windows show                | Home folder                     |
| Finder → Settings → Advanced → Show all filename extensions   | On                              |
| Finder → Settings → Advanced → Keep folders on top            | All options                     |
| Finder → Settings → Advanced → When performing a search       | Current Folder                  |
| Finder → View → Show Path Bar                                 | On                              |
| Finder → View → Show Status Bar                               | On                              |
| Finder → View                                                 | Column View (⌘3)                |
| Finder → Sidebar                                              | Unpin: AirDrop, Shared, Recents |
| Keyboard → Keyboard Shortcuts → Spotlight → Show Spotlight Search | Off                             |

## Keyboard Shortcuts

Custom shortcuts via [Superkey](https://superkey.app/).

| Trigger             | Action            |
| ------------------- | ----------------- |
| Caps Lock (hold)    | Left Control      |
| Caps Lock (tap)     | Escape            |
| Caps Lock + H/J/K/L | ←↓↑→ (Arrow keys) |
| Double tap Shift    | Caps Lock         |
| ⇧⌘K                 | Toggle Seek       |

## Usage

### Brewfile

Brewfile is stored at `~/.Brewfile` (global). Use `-g` flag for all operations:

```sh
brew bundle install -g -v                # Install dependencies
brew bundle dump -g --force --no-vscode  # Update Brewfile (skip vscode)
brew bundle check -g -v                  # Verify all installed
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
