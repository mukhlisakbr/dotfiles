import {
  rule,
  writeToProfile,
  map,
  toApp,
  toKey,
  ifApp,
  ifVar,
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

  // --- Sub-layers ---

  // App Launcher layer (Hyper + ;)
  const appLauncherLayer = hyperLayer("semicolon", "app_launcher")
    .description("App Launcher")
    .manipulators([
      map("a").to(toApp("Alacritty")),
      map("c").to(toApp("Google Chrome")),
      map("d").to(toApp("Discord")),
      map("f").to(toApp("Finder")),
      map("n").to(toApp("Notion")),
      map("s").to(toApp("Slack")),
      map("v").to(toApp("Code")), // VS Code
      map("z").to(toApp("zoom.us")),
    ]);

  // Window Management layer (Hyper + w)
  const windowManagementLayer = hyperLayer("w", "window_management")
    .description("Window Management")
    .leaderMode()
    .manipulators([
      // Arrows for moving focus
      map("h").to(toKey("left_arrow", ["left_control", "left_option"])),
      map("j").to(toKey("down_arrow", ["left_control", "left_option"])),
      map("k").to(toKey("up_arrow", ["left_control", "left_option"])),
      map("l").to(toKey("right_arrow", ["left_control", "left_option"])),
      // Moving windows
      map("h", "shift").to(
        toKey("left_arrow", ["left_control", "left_option", "left_shift"])
      ),
      map("j", "shift").to(
        toKey("down_arrow", ["left_control", "left_option", "left_shift"])
      ),
      map("k", "shift").to(
        toKey("up_arrow", ["left_control", "left_option", "left_shift"])
      ),
      map("l", "shift").to(
        toKey("right_arrow", ["left_control", "left_option", "left_shift"])
      ),
      // Maximize window
      map("return_or_enter").to(toKey("f", ["left_control", "left_command"])), // macOS fullscreen
    ]);

  // --- Application-specific and Global Rules ---

  // Define conditions that are true if we are NOT in a sub-layer.
  const notInSubLayerConditions = [
    ifVar("app_launcher").unless(),
    ifVar("window_management").unless(),
  ];

  // Use the hyper alias '⌘⌥⌃⇧' for mandatory modifiers.
  const hyper = "⌘⌥⌃⇧";

  const vsCodeRules = rule(
    "VS Code",
    ifApp("^com\\.microsoft\\.VSCode$"),
    ...notInSubLayerConditions
  ).manipulators([
    map("a", hyper).to([toKey("a", "command"), toKey("c", "command")]),
  ]);

  const chromeRules = rule(
    "Google Chrome",
    ifApp("^com\\.google\\.Chrome$"),
    ...notInSubLayerConditions
  ).manipulators([map("r", hyper).to(toKey("r", "command"))]);

  const globalHyperShortcuts = rule(
    "Global Hyper Shortcuts",
    ...notInSubLayerConditions
  ).manipulators([
    map("l", hyper).to(toKey("q", ["right_control", "right_command"])), // Lock screen
  ]);

  // --- Write configuration ---
  writeToProfile("Default", [
    hyperKeyRule,
    appLauncherLayer,
    windowManagementLayer,
    vsCodeRules,
    chromeRules,
    globalHyperShortcuts,
  ]);
}

main();
