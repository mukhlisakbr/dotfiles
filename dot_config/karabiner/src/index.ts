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
      map("a").to(toApp("ChatGPT")),
      map("b").to(toApp("Google Chrome")),
      map("c").to(toApp("WhatsApp")),
      map("e").to(toApp("Windsurf")),
      map("f").to(toApp("Finder")),
      map("m").to(toApp("Spotify")),
      map("p").to(toApp("Bitwarden")),
      map("t").to(toApp("Ghostty")),
    ]),
  ]);
}

function createGeneralHyperRule(hyper: HyperModifier) {
  return rule("Hyper | General Navigation").manipulators([
    hyper([
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
      map("d").to(toKey("d", "⌃")),
      map("u").to(toKey("u", "⌃")),
      map("o").to(toKey("o", "⌃")), // Terminal open command
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
    .condition(ifApp(["com.google.Chrome"]))
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
