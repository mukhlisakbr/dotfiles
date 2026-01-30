# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Chezmoi-managed dotfiles repository for macOS. Chezmoi naming conventions:

- `dot_` → `.` (hidden files)
- `private_` → restricted permissions
- `encrypted_*.asc` → GPG-encrypted (decrypted via Bitwarden)
- `empty_` → creates empty files

Auto-commit and auto-push are enabled in `.chezmoi.toml.tmpl`.

## Common Commands

```sh
# Apply dotfiles to home directory
chezmoi apply

# Check for unsynced changes between target and source
chezmoi diff

# Sync target changes back to source (after editing files directly)
chezmoi re-add ~/.path/to/file

# Add new file to chezmoi management
chezmoi add ~/.path/to/file

# Remove file from chezmoi (source and target)
chezmoi destroy ~/.path/to/file

# Pull and apply from remote
chezmoi update

# Install/update Homebrew dependencies
brew bundle install -g
brew bundle dump -g --force --no-vscode

# Install runtime tools (node, bun, java, go, python)
mise install
```

## Workflow

**Preferred:** Edit files at target location (`~/.zshrc`, etc.), then `chezmoi diff` to review and `chezmoi re-add` to sync back.

**Encrypted files:** Require Bitwarden CLI login for decryption. Never edit `.asc` files directly.

## Architecture

### Configuration Targets

| Directory                   | Target                    | Purpose                       |
| --------------------------- | ------------------------- | ----------------------------- |
| `dot_zshrc`, `dot_zprofile` | `~/.zshrc`, `~/.zprofile` | Shell configuration           |
| `dot_config/nvim/`          | `~/.config/nvim/`         | LazyVim (Neovim)              |
| `dot_config/ghostty/`       | `~/.config/ghostty/`      | Terminal emulator             |
| `dot_config/mise/`          | `~/.config/mise/`         | Runtime versions              |
| `dot_config/starship.toml`  | `~/.config/starship.toml` | Shell prompt                  |
| `dot_config/yazi/`          | `~/.config/yazi/`         | Terminal file manager         |
| `dot_config/opencode/`      | `~/.config/opencode/`     | OpenCode AI assistant         |
| `dot_config/private_git/`   | `~/.config/git/`          | Git global ignore             |
| `dot_claude/`               | `~/.claude/`              | Claude Code settings          |
| `dot_ssh/`                  | `~/.ssh/`                 | SSH configuration (encrypted) |
| `private_dot_gitconfig`     | `~/.gitconfig`            | Git configuration             |

### Encrypted Files

Files ending in `.asc` are GPG-encrypted. **Requires Bitwarden CLI login** - passphrase retrieved from Bitwarden automatically.

| File                                                       | Purpose                                    |
| ---------------------------------------------------------- | ------------------------------------------ |
| `encrypted_dot_zshenv.asc`                                 | Sensitive environment variables (API keys) |
| `dot_ssh/encrypted_config.asc`                             | SSH hosts configuration                    |
| `dot_local/share/opencode/encrypted_private_auth.json.asc` | OpenCode authentication                    |

### Key Tool Integrations

**Shell stack:** zsh → oh-my-zsh (git plugin) → zinit (autosuggestions, syntax-highlighting) → starship

**Neovim:** LazyVim with extras:

- Languages: TypeScript, JSON, YAML, Docker, Prisma, Tailwind, TOML
- Formatting/Linting: Prettier, ESLint
- Editor: snacks_explorer, snacks_picker, inc-rename

**Runtimes (mise):** node, bun, go, python (latest), java (zulu-17)

## Shell Aliases

| Alias              | Command                                        |
| ------------------ | ---------------------------------------------- |
| `lg`               | `lazygit`                                      |
| `wip`              | `git add . && git commit -m "wip" && git push` |
| `cc`               | `claude --mcp-config ~/.claude/mcp.json`       |
| `ccc`              | `claude --mcp-config ~/.claude/mcp.json -c`    |
| `oc`               | `opencode`                                     |
| `l` / `ll` / `lla` | `eza` with icons                               |
