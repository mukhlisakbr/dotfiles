# dotfiles

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/) for macOS.

## Setup

### 0. Initial System Settings

| Path                                                    | Value    |
| ------------------------------------------------------- | -------- |
| General → About → Name                                  | macbook  |
| Privacy & Security → App Management → Terminal          | On       |

> Rename the Mac first for consistent hostname. Enable Terminal App Management for installing apps like ExpressVPN.

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
| Dock → Automatically hide and show the Dock                   | On                              |
| Finder → Settings → General → New windows show                | Home folder                     |
| Finder → Settings → Advanced → Show all filename extensions   | On                              |
| Finder → Settings → Advanced → Keep folders on top            | All options                     |
| Finder → Settings → Advanced → When performing a search       | Current Folder                  |
| Finder → View → Show Path Bar                                 | On                              |
| Finder → View → Show Status Bar                               | On                              |
| Finder → View                                                 | Column View (⌘3)                |
| Finder → Sidebar                                              | Unpin: AirDrop, Shared, Recents |
| Keyboard → Keyboard Shortcuts → Spotlight → Show Spotlight Search | Off                             |

## Initial App Setup

### Raycast

Wizard:

1. AI: Off
2. Extensions: Don't install all
3. Raycast Hotkey: ⌘Space (replaces Spotlight)
4. Grant Access: Files and Folders, Accessibility

Extensions:

| Extension             | Shortcut / Config                |
| --------------------- | -------------------------------- |
| Clipboard History     | ⇧⌘V                              |
| Search Emoji          | ⌃⌘Space (replaces macOS picker)  |
| Window Management     | Preset: Magnet                   |
| Screenshot            | —                                |

### Superkey

General:

| Setting               | Value                            |
| --------------------- | -------------------------------- |
| Launch on login       | On                               |
| Check update auto     | On                               |
| Menu bar icon         | Changed                          |

Presets:

| Preset                      | Value                      |
| --------------------------- | -------------------------- |
| Remap Caps Lock to          | Left Control               |
| Quick press Caps Lock to    | Escape                     |
| Caps Lock + H/J/K/L         | Enable                     |
| Double Shift to Caps Lock   | Enable                     |

Seek:

| Setting               | Value                            |
| --------------------- | -------------------------------- |
| Toggle Seek shortcut  | ⇧⌘K                              |

### VS Code

Profile icon → Backup and Sync Settings → Sign in with GitHub → Wait until all sync done

### Google Chrome

Wizard: Automatically send usage stats: Off

### Logi Options+

Wizard:

1. Grant all permissions
2. Help us improve: No Thanks
3. Login

| Path                  | Action                           |
| --------------------- | -------------------------------- |
| Mouse → Settings      | Restore settings from backup     |

## Usage

### Brewfile

Brewfile is stored at `~/.Brewfile` (global). Use `-g` flag for all operations:

```sh
# Install dependencies
brew bundle install -g -v
# Update Brewfile
brew bundle dump -g --force --no-vscode --no-go
# Verify all installed
brew bundle check -g -v
# List dependencies
brew bundle list -g
```

> VS Code extensions and Go packages are skipped since they're managed separately.

### Chezmoi

```sh
# Add a new file
chezmoi add ~/.config/some/file
# Check for unsynced changes
chezmoi diff
# Sync target changes back to source
chezmoi re-add ~/.zshrc
# Remove from source and target
chezmoi destroy ~/.some/file
# Pull and apply from remote
chezmoi update
```

> Workflow: Edit files directly at target location, then use `chezmoi diff` to check and `chezmoi re-add` to sync.
