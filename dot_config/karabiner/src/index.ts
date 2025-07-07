import {
  rule,
  writeToProfile,
  map,
  toApp,
  toKey,
  hyperLayer,
  ifApp,
  withModifier,
} from "karabiner.ts";

/**
 * Main function to generate Karabiner configuration.
 */
function main() {
  // Define Hyper Key on Caps Lock. Escape if alone.
  const hyperKeyRule = rule("Hyper Key").manipulators([
    map("⇪").toHyper().toIfAlone("⎋"),
  ]);

  // --- Global Remaps ---
  const globalRemaps = rule("Global Remaps").manipulators([
    map("›⌥").to("⇪"), // Right Option to Caps Lock
  ]);

  // App Launcher layer (Hyper + o)
  const appLauncherLayer = hyperLayer("o", "app_launcher")
    .description("App Launcher")
    .manipulators([
      map("a").to(toApp("ChatGPT")),
      map("b").to(toApp("Google Chrome")),
      map("c").to(toApp("WhatsApp")),
      map("e").to(toApp("Visual Studio Code")),
      map("f").to(toApp("Finder")),
      map("m").to(toApp("Spotify")),
      map("t").to(toApp("Ghostty")),
    ]);

  // Window Management layer (Hyper + w)
  const windowManagementLayer = hyperLayer("w", "window_management")
    .description("Window Management")
    .manipulators([
      // Moving windows
      map("h").to(toKey("←", "⌥⌃")),
      map("j").to(toKey("↓", "⌥⌃")),
      map("k").to(toKey("↑", "⌥⌃")),
      map("l").to(toKey("→", "⌥⌃")),
      // Maximize window
      map("⏎").to(toKey("⏎", "⌥⌃")),
    ]);

  // --- General Hyper Key Rules ---
  const generalHyperRules = rule("General Hyper Rules").manipulators([
    withModifier("Hyper")([
      // VIM-style arrow keys
      map("h").to(toKey("←")),
      map("j").to(toKey("↓")),
      map("k").to(toKey("↑")),
      map("l").to(toKey("→")),
      // Tab navigation
      map("]").to(toKey("]", "⌘⇧")),
      map("[").to(toKey("[", "⌘⇧")),
      // Shell & text commands
      map("c").to(toKey("c", "⌃")),
      map("r").to(toKey("r", "⌃")),
      map("v").to(toKey("v", "⌃")),
    ]),
  ]);

  // --- VS Code Hyper Key Rules ---
  const vsCodeHyperRules = rule("VS Code Hyper Rules")
    .condition(ifApp("com.microsoft.VSCode"))
    .manipulators([
      withModifier("Hyper")([
        map("t").to(toKey("`", "⌃")), // Toggle Terminal
        map("g").to(toKey("g", "⌃⇧")), // Toggle Source Control
        map("e").to(toKey("e", "⌘⇧")), // Toggle Explorer
        map("x").to(toKey("x", "⌘⇧")), // Toggle Extensions
        map("f").to(toKey("p", "⌘")), // Go to File
        map("y").to(toKey("o", "⌘⇧")), // Go to Symbol in File
        map("u").to(toKey("t", "⌘")), // Go to Symbol in Workspace
        map("d").to(toKey("f12")), // Go to Definition
        map("i").to(toKey("a", "⌘⇧")), // Kilocode AI Agent
        map("p").to(toKey("p", "⌘⇧")), // Show Command Palette
        map("␣").to(toKey("␣", "⌃")), // Trigger Autocomplete
      ]),
    ]);

  // --- Chrome Hyper Key Rules ---
  const chromeHyperRules = rule("Chrome Hyper Rules")
    .condition(ifApp("com.google.Chrome"))
    .manipulators([
      withModifier("Hyper")([
        map("t").to(toKey("a", "⌘⇧")), // Search Tabs
      ]),
    ]);

  // --- Write configuration ---
  writeToProfile("Default", [
    // Global rules
    hyperKeyRule,
    globalRemaps,
    // Layers
    appLauncherLayer,
    windowManagementLayer,
    // General hyper rules
    generalHyperRules,
    // App-specific rules
    vsCodeHyperRules,
    chromeHyperRules,
  ]);
}

main();
