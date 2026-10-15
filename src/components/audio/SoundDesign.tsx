import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

interface SoundCue {
  name: string;
  file: string;
  from: number;
  duration: number;
  volume: number;
}

const SOUND_CUES: SoundCue[] = [
  // ==========================================
  // SCENE 01: THE HOUR (0–4s / frames 0–120)
  // ==========================================
  {
    name: "01-clock-tick-1",
    file: "sfx/mouse-click.wav",
    from: 6,
    duration: 15,
    volume: 0.35,
  },
  {
    name: "01-clock-tick-2",
    file: "sfx/mouse-click.wav",
    from: 18,
    duration: 15,
    volume: 0.3,
  },
  {
    name: "01-split-watermarks",
    file: "sfx/whoosh.wav",
    from: 30,
    duration: 25,
    volume: 0.55,
  },
  {
    name: "01-beam-sweep",
    file: "sfx/whoosh.wav",
    from: 42,
    duration: 30,
    volume: 0.85,
  },
  {
    name: "01-text-its",
    file: "sfx/switch.wav",
    from: 50,
    duration: 20,
    volume: 0.45,
  },
  {
    name: "01-text-after",
    file: "sfx/switch.wav",
    from: 56,
    duration: 20,
    volume: 0.55,
  },
  {
    name: "01-text-10pm-slam",
    file: "sfx/whip.wav",
    from: 62,
    duration: 30,
    volume: 0.8,
  },

  // ==========================================
  // SCENE 02: THE IDEAS (4–8s / frames 120–240)
  // ==========================================
  {
    name: "02-think-slam",
    file: "sfx/whip.wav",
    from: 120,
    duration: 30,
    volume: 0.85,
  },
  {
    name: "02-design-whoosh",
    file: "sfx/whoosh.wav",
    from: 158,
    duration: 25,
    volume: 0.5,
  },
  {
    name: "02-design-snap",
    file: "sfx/switch.wav",
    from: 158,
    duration: 20,
    volume: 0.65,
  },
  {
    name: "02-build-slam",
    file: "sfx/whip.wav",
    from: 198,
    duration: 30,
    volume: 0.9,
  },
  {
    name: "02-verified-ding",
    file: "sfx/ding.wav",
    from: 220,
    duration: 45,
    volume: 0.45,
  },

  // ==========================================
  // SCENE 03: THE PROCESS (8–13s / frames 240–390)
  // ==========================================
  {
    name: "03-transition-whoosh",
    file: "sfx/whoosh.wav",
    from: 240,
    duration: 25,
    volume: 0.6,
  },
  {
    name: "03-window-draw",
    file: "sfx/switch.wav",
    from: 250,
    duration: 20,
    volume: 0.4,
  },
  {
    name: "03-code-type-1",
    file: "sfx/mouse-click.wav",
    from: 268,
    duration: 15,
    volume: 0.35,
  },
  {
    name: "03-code-type-2",
    file: "sfx/mouse-click.wav",
    from: 285,
    duration: 15,
    volume: 0.35,
  },
  {
    name: "03-ui-morph",
    file: "sfx/switch.wav",
    from: 305,
    duration: 20,
    volume: 0.75,
  },
  {
    name: "03-tab-switch-1",
    file: "sfx/switch.wav",
    from: 325,
    duration: 20,
    volume: 0.55,
  },
  {
    name: "03-tab-switch-2",
    file: "sfx/switch.wav",
    from: 355,
    duration: 20,
    volume: 0.55,
  },

  // ==========================================
  // SCENE 04: THE BUILD (13–18s / frames 390–540)
  // ==========================================
  {
    name: "04-made-work-slam",
    file: "sfx/whip.wav",
    from: 390,
    duration: 30,
    volume: 0.85,
  },
  {
    name: "04-reticle-lock",
    file: "sfx/switch.wav",
    from: 428,
    duration: 20,
    volume: 0.5,
  },
  {
    name: "04-whats-next-slam",
    file: "sfx/whip.wav",
    from: 465,
    duration: 30,
    volume: 0.9,
  },
  {
    name: "04-crescendo-whoosh",
    file: "sfx/whoosh.wav",
    from: 520,
    duration: 35,
    volume: 0.8,
  },

  // ==========================================
  // SCENE 05: THE REVEAL (18–22s / frames 540–660)
  // ==========================================
  {
    name: "05-converge-whoosh",
    file: "sfx/whoosh.wav",
    from: 540,
    duration: 25,
    volume: 0.65,
  },
  {
    name: "05-flash-expand",
    file: "sfx/whoosh.wav",
    from: 550,
    duration: 30,
    volume: 0.9,
  },
  {
    name: "05-camera-shutter-contract",
    file: "sfx/shutter-modern.wav",
    from: 568,
    duration: 35,
    volume: 0.95,
  },
  {
    name: "05-after10pm-slam",
    file: "sfx/whip.wav",
    from: 572,
    duration: 30,
    volume: 0.75,
  },
  {
    name: "05-studio-ding",
    file: "sfx/ding.wav",
    from: 580,
    duration: 45,
    volume: 0.65,
  },

  // ==========================================
  // SCENE 06: THE END CARD (22–24s / frames 660–720)
  // ==========================================
  {
    name: "06-endcard-cut",
    file: "sfx/switch.wav",
    from: 660,
    duration: 20,
    volume: 0.5,
  },
  {
    name: "06-indicator-dot",
    file: "sfx/mouse-click.wav",
    from: 666,
    duration: 15,
    volume: 0.45,
  },
  {
    name: "06-website-chime",
    file: "sfx/ding.wav",
    from: 672,
    duration: 48,
    volume: 0.6,
  },
];

export const SoundDesign: React.FC = () => {
  return (
    <>
      {SOUND_CUES.map((cue) => (
        <Sequence
          key={cue.name}
          from={cue.from}
          durationInFrames={cue.duration}
          name={`SFX: ${cue.name}`}
        >
          <Audio src={staticFile(cue.file)} volume={cue.volume} />
        </Sequence>
      ))}
    </>
  );
};
