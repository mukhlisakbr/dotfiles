import {
  rule,
  writeToProfile,
  map,
  toApp,
  toKey,
  hyperLayer,
} from "karabiner.ts";

/**
 * Main function to generate Karabiner configuration.
 */
function main() {
  // Define Hyper Key on Caps Lock. Escape if alone.
  const hyperKeyRule = rule("Hyper Key (Caps Lock)").manipulators([
    map("caps_lock").toHyper().toIfAlone("escape"),
  ]);

  // Remap Right Option to Caps Lock
  const remapRightOptionToCapsLock = rule(
    "Remap Right Option to Caps Lock"
  ).manipulators([map("›⌥").to("⇪")]);

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
      map("t").to(toApp("iTerm")),
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
  const generalHyperRules = rule("General Hyper Key Rules").manipulators([
    // VIM-style arrow keys
    map("h", "Hyper").to(toKey("←")),
    map("j", "Hyper").to(toKey("↓")),
    map("k", "Hyper").to(toKey("↑")),
    map("l", "Hyper").to(toKey("→")),
    // Tab navigation
    map("]", "Hyper").to(toKey("]", "⌘⇧")),
    map("[", "Hyper").to(toKey("[", "⌘⇧")),
    // Shell & text commands
    map("c", "Hyper").to(toKey("c", "⌃")),
    map("r", "Hyper").to(toKey("r", "⌃")),
    map("v", "Hyper").to(toKey("v", "⌃")),
  ]);

  // --- Write configuration ---
  writeToProfile("Default", [
    hyperKeyRule,
    remapRightOptionToCapsLock,
    appLauncherLayer,
    windowManagementLayer,
    generalHyperRules,
  ]);
}

main();
