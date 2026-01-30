# dotfiles

Personal dotfiles managed with [chezmoi](https://www.chezmoi.io/) for macOS.

## Setup

> ⚠️ **First-time setup only.** Do not run twice.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/mukhlisakbr/dotfiles/main/setup.sh)"
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
~/.local/share/chezmoi/macos-defaults.sh
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
