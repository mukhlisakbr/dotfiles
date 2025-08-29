# Package Manager Rules

## Default Package Manager

Always use **bun** as the default package manager for all Node.js projects and npm script execution.

## Exception Handling

If a project already contains a lock file for another package manager, respect that existing configuration and use the corresponding package manager instead. The detection should check for the presence of these files:

- `package-lock.json` (npm)
- `yarn.lock` (Yarn)
- `pnpm-lock.yaml` (pnpm)

In such cases, do not attempt to use bun and instead use the project's existing package manager.

## On-the-fly Package Execution

When running packages on the fly (e.g., `npx` equivalent), prefer `bunx` unless the project context indicates a different package manager should be used based on the lock file detection rule above.
