export const THEME = {
  colors: {
    primaryWhite: "#FFFFFF",
    primaryAccent: "#FFFFFF",
    // Black & White / Monochrome palette
    primaryOrange: "#FFFFFF", // Monochrome replacement for all primary accents
    background: "#080808",    // Deep obsidian black
    secondaryBg: "#121212",   // Editorial charcoal
    cardBg: "#171717",
    cardBgElevated: "#222222",
    borderSubtle: "#262626",
    borderMedium: "#444444",
    borderActive: "#FFFFFF",
    textPrimary: "#FFFFFF",
    textSecondary: "#E2E2E2",
    textMuted: "#888888",
    textDim: "#555555",
    textDark: "#000000",
    textInverted: "#000000",
    accentGlow: "rgba(255, 255, 255, 0.25)",
    accentSubtle: "rgba(255, 255, 255, 0.08)",
    orangeGlow: "rgba(255, 255, 255, 0.25)",
    orangeSubtle: "rgba(255, 255, 255, 0.08)",
  },
  fonts: {
    display:
      "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
    mono:
      "'JetBrains Mono', 'Space Mono', 'SF Mono', Consolas, monospace",
  },
  meta: {
    brandName: "After10PM Studio",
    tagline: "Digital products. Engineered with intent.",
    website: "after10pm.xyz",
    websiteFull: "https://after10pm.xyz",
    instagram: "@aft10pm",
  },
  video: {
    width: 1080,
    height: 1920,
    fps: 30,
    durationInSeconds: 24,
    totalFrames: 720,
  },
  sceneFrames: {
    scene01: { start: 0, duration: 120 },     // 0-4s: THE HOUR
    scene02: { start: 120, duration: 120 },   // 4-8s: THE IDEAS
    scene03: { start: 240, duration: 150 },   // 8-13s: THE PROCESS
    scene04: { start: 390, duration: 150 },   // 13-18s: THE BUILD
    scene05: { start: 540, duration: 120 },   // 18-22s: THE REVEAL
    scene06: { start: 660, duration: 60 },    // 22-24s: THE END CARD
  },
} as const;
