#!/bin/bash
# macOS defaults configuration
# Run manually: ./macos-defaults.sh
# Logout/restart may be required after changes.

set -e

echo "Configuring macOS defaults..."

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

echo "Done! You may need to logout/restart for some changes to take effect."
