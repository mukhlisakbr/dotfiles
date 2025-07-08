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
  // --- Base Layers & Global Rules ---
  const hyperKeyRule = rule("Base: Hyper Key").manipulators([
    map("⇪").toHyper().toIfAlone("⎋"),
  ]);
  const globalRemaps = rule("Base: Global Remaps").manipulators([
    map("⎋").to("⇪"), // Escape to Caps Lock
  ]);

  // --- Modifier-based Rules ---
  const appLauncherRule = rule("Modifiers: App Launcher").manipulators([
    withModifier("›⌘")([
      map("a").to(toApp("ChatGPT")),
      map("b").to(toApp("Google Chrome")),
      map("c").to(toApp("WhatsApp")),
      map("e").to(toApp("Visual Studio Code")),
      map("f").to(toApp("Finder")),
      map("m").to(toApp("Spotify")),
      map("t").to(toApp("Ghostty")),
    ]),
  ]);
  const windowManagementRule = rule(
    "Modifiers: Window Management"
  ).manipulators([
    withModifier("fn")([
      // Moving windows
      map("h").to(toKey("←", "⌥⌃")),
      map("j").to(toKey("↓", "⌥⌃")),
      map("k").to(toKey("↑", "⌥⌃")),
      map("l").to(toKey("→", "⌥⌃")),
      // Maximize window
      map("⏎").to(toKey("⏎", "⌥⌃")),
    ]),
  ]);

  // --- Hyper Key Rules ---
  const generalHyperRules = rule("Hyper: General").manipulators([
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
  const vsCodeHyperRules = rule("Hyper: VS Code")
    .condition(ifApp("com.microsoft.VSCode"))
    .manipulators([
      withModifier("Hyper")([
        map("t").to(toKey("`", "⌃")), // Toggle Terminal
        map("g").to(toKey("g", "⌃⇧")), // Toggle Source Control
        map("e").to(toKey("e", "⌘⇧")), // Toggle Explorer
        map("x").to(toKey("x", "⌘⇧")), // Toggle Extensions
        map("f").to(toKey("p", "⌘")), // Go to File
        map("o").to(toKey("o", "⌘⇧")), // Go to Symbol in File
        map("w").to(toKey("t", "⌘")), // Go to Symbol in Workspace
        map("d").to(toKey("f12")), // Go to Definition
        map(";").to(toKey("'", "⌘")), // Cline AI Agent
        map("p").to(toKey("p", "⌘⇧")), // Show Command Palette
        map("␣").to(toKey("␣", "⌃")), // Trigger Autocomplete
      ]),
    ]);
  const chromeHyperRules = rule("Hyper: Chrome")
    .condition(ifApp("com.google.Chrome"))
    .manipulators([
      withModifier("Hyper")([
        map("t").to(toKey("a", "⌘⇧")), // Search Tabs
      ]),
    ]);

  // --- Write configuration ---
  writeToProfile("Default", [
    // Base Layers & Global Rules
    hyperKeyRule,
    globalRemaps,
    // Modifier-based Rules
    appLauncherRule,
    windowManagementRule,
    // Hyper Key Rules
    generalHyperRules,
    vsCodeHyperRules,
    chromeHyperRules,
  ]);
}

main();
