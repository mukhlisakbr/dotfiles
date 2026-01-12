import {
  rule,
  writeToProfile,
  map,
  toApp,
  toKey,
  ifApp,
  withModifier,
} from "karabiner.ts";

type HyperModifier = ReturnType<typeof withModifier>;

/**
 * Main function to generate Karabiner configuration.
 */
function createBaseRules() {
  const capsLockHyperRule = rule("Base | Caps Lock as Hyper").manipulators([
    map("⇪").toHyper().toIfAlone("⎋"),
  ]);

  const escapeToCapsRule = rule("Base | Escape to Caps Lock").manipulators([
    map("⎋").to("⇪"),
  ]);

  return [capsLockHyperRule, escapeToCapsRule];
}

function createHyperRules() {
  const hyper = withModifier("Hyper");

  return [
    createCodeEditorHyperRule(hyper),
    createChromiumHyperRule(hyper),
    createGeneralHyperRule(hyper),
  ];
}

function createModifierRules() {
  return [createAppLauncherRule()];
}

function createAppLauncherRule() {
  return rule("Launcher | Favorite Apps").manipulators([
    withModifier("›⌘")([
      map("a").to(toApp("ChatGPT")),            // AI
      map("b").to(toApp("Google Chrome")),       // Browser
      map("c").to(toApp("WhatsApp")),           // Chat
      map("e").to(toApp("Visual Studio Code")), // Editor
      map("f").to(toApp("Finder")),             // Files
      map("l").to(toApp("Herd")),               // Local Server
      map("m").to(toApp("Spotify")),            // Music
      map("p").to(toApp("Bitwarden")),          // Password
      map("s").to(toApp("Sublime Text")),       // Secondary Editor
      map("t").to(toApp("Ghostty")),            // Terminal
      map("w").to(toApp("Telegram")),           // Work Chat
    ]),
  ]);
}

function createGeneralHyperRule(hyper: HyperModifier) {
  return rule("Hyper | General Navigation").manipulators([
    hyper([
      // Screenshot
      map("s").to(toKey("4", "⌘⌃⇧")), // Screenshot area to clipboard
      // VIM-style arrow keys
      map("h").to(toKey("←")),
      map("j").to(toKey("↓")),
      map("k").to(toKey("↑")),
      map("l").to(toKey("→")),
      // Tab navigation
      map(",").to(toKey("[", "⌘⇧")), // Prev tab
      map(".").to(toKey("]", "⌘⇧")), // Next tab
      // Shell & text commands
      map("a").to(toKey("a", "⌃")), // Beginning of line
      map("b").to(toKey("b", "⌃")), // Backward one char
      map("c").to(toKey("c", "⌃")), // Cancel / Interrupt
      map("d").to(toKey("d", "⌃")), // EOF / Exit
      map("e").to(toKey("e", "⌃")), // End of line
      map("f").to(toKey("f", "⌃")), // Forward search
      map("g").to(toKey("g", "⌃")), // Cancel search
      map("n").to(toKey("n", "⌃")), // Next command
      map("o").to(toKey("o", "⌃")), // Open command
      map("p").to(toKey("p", "⌃")), // Previous command
      map("r").to(toKey("r", "⌃")), // Reverse search
      map("t").to(toKey("t", "⌃")), // Transpose
      map("u").to(toKey("u", "⌃")), // Clear line
      map("v").to(toKey("v", "⌃")), // Paste
      map("w").to(toKey("w", "⌃")), // Delete word backward
      map("x").to(toKey("x", "⌃")), // Cut / Kill line
      map("y").to(toKey("y", "⌃")), // Yank (paste kill ring)
      map("z").to(toKey("z", "⌃")), // Suspend process
      map("␣").to(toKey("␣", "⌃")), // Tmux prefix (Ctrl+Space)
    ]),
  ]);
}

function createCodeEditorHyperRule(hyper: HyperModifier) {
  return rule("Hyper | Code Editors")
    .condition(
      ifApp([
        "com.microsoft.VSCode",
        "com.trae.app",
        "com.todesktop.230313mzl4w4u92",
        "com.exafunction.windsurf",
        "dev.kiro.desktop"
      ])
    )
    .manipulators([
      hyper([
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
}

function createChromiumHyperRule(hyper: HyperModifier) {
  return rule("Hyper | Chromium Browsers")
    .condition(ifApp(["com.google.Chrome", "net.imput.helium"]))
    .manipulators([
      hyper([
        map("t").to(toKey("a", "⌘⇧")), // Search Tabs
      ]),
    ]);
}

function main() {
  const baseRules = createBaseRules();
  const modifierRules = createModifierRules();
  const hyperRules = createHyperRules();

  writeToProfile("Default", [...baseRules, ...modifierRules, ...hyperRules]);
}

main();
