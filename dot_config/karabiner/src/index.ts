import {
  rule,
  writeToProfile,
  map,
  toApp,
  toKey,
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
      map("b").to(toApp("Helium")),
      map("c").to(toApp("WhatsApp")),
      map("e").to(toApp("Cursor")),
      map("f").to(toApp("Finder")),
      map("m").to(toApp("Spotify")),
      map("p").to(toApp("Bitwarden")),
      map("t").to(toApp("Warp")),
      map("s").to(toApp("Stremio Enhanced")),
    ]),
  ]);

  //const windowManagementRule = rule(
  //  "Modifiers: Window Management"
  //).manipulators([
  //  withModifier("fn")([
  //    // Moving windows
  //    map("h").to(toKey("←", "⌥⌃")),
  //    map("j").to(toKey("↓", "⌥⌃")),
  //    map("k").to(toKey("↑", "⌥⌃")),
  //    map("l").to(toKey("→", "⌥⌃")),
  //    // Maximize window
  //    map("⏎").to(toKey("⏎", "⌥⌃")),
  //  ]),
  //]);

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
      map("t").to(toKey("t", "⌃")),
      map("o").to(toKey("o", "⌃")), // Terminal open command
    ]),
  ]);
  const codeEditorHyperRules = rule("Hyper: Code Editor")
    .condition(ifApp(["com.microsoft.VSCode", "com.trae.app", "com.todesktop.230313mzl4w4u92"]))
    .manipulators([
      withModifier("Hyper")([
        map("t").to(toKey("`", "⌃")), // Toggle Terminal
        map("g").to(toKey("g", "⌃⇧")), // Toggle Source Control
        map("e").to(toKey("e", "⌘⇧")), // Toggle Explorer
        map("x").to(toKey("x", "⌘⇧")), // Toggle Extensions
        map("b").to(toKey("b", "⌘")), // Toggle Sidebar
        map("f").to(toKey("p", "⌘")), // Go to File
        map("o").to(toKey("o", "⌘⇧")), // Go to Symbol in File
        map("w").to(toKey("t", "⌘")), // Go to Symbol in Workspace
        map("d").to(toKey("f12")), // Go to Definition
        map("i").to(toKey("i", "⌘⌃")), // github copilot toggle chat
        map("p").to(toKey("p", "⌘⇧")), // Show Command Palette
        map("␣").to(toKey("␣", "⌃")), // Trigger Autocomplete
      ]),
    ]);
  const chromeHyperRules = rule("Hyper: Chromium Browsers")
    .condition(ifApp(["com.google.Chrome", "net.imput.helium"]))
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
    //windowManagementRule,

    // Hyper Key Rules
    codeEditorHyperRules,
    chromeHyperRules,
    generalHyperRules,
  ]);
}

main();
