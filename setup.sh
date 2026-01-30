#!/bin/bash
# macOS dotfiles setup script
# Run: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/mukhlisakbr/dotfiles/main/setup.sh)"

set -e

echo "=== macOS Dotfiles Setup ==="

# 1. Install Homebrew
echo "[1/7] Installing Homebrew..."
NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
eval "$(/opt/homebrew/bin/brew shellenv)"

# 2. Install Bitwarden CLI (for decrypting secrets)
echo "[2/7] Installing Bitwarden CLI..."
brew install bitwarden-cli
bw login

# 3. Install oh-my-zsh
echo "[3/7] Installing oh-my-zsh..."
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# 4. Install chezmoi and apply dotfiles
echo "[4/7] Installing chezmoi and applying dotfiles..."
brew install chezmoi
chezmoi init --apply mukhlisakbr

# 5. Install dependencies from Brewfile
echo "[5/7] Installing Homebrew dependencies..."
brew bundle install -g -v

# 6. Install runtime tools via mise
echo "[6/7] Installing runtime tools via mise..."
mise install

# 7. Install vim-plug for Vim
echo "[7/7] Installing vim-plug..."
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
vim +PlugInstall +qall

echo "=== Setup complete! ==="
echo "Please restart your terminal or run: source ~/.zshrc"
