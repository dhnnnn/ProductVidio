import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

interface VoiceoverCue {
  id: string;
  file: string;
  from: number;
  durationInFrames: number;
  volume: number;
  playbackRate?: number;
}

const VOICEOVER_CUES: VoiceoverCue[] = [
  // Scene 01: "It’s after 10 PM." — synchronized with main typography reveal
  {
    id: "vo-scene01",
    file: "voiceover/scene01.mp3",
    from: 48,
    durationInFrames: 68,
    volume: 1.0,
  },

  // Scene 02: "Think, design, build." — synchronized across kinetic typographic cuts
  {
    id: "vo-scene02",
    file: "voiceover/scene02.mp3",
    from: 124,
    durationInFrames: 74,
    volume: 1.0,
  },

  // Scene 03: "Transforming ideas into digital products." — synchronized with browser frame & headline
  {
    id: "vo-scene03",
    file: "voiceover/scene03.mp3",
    from: 248,
    durationInFrames: 98,
    volume: 1.0,
  },

  // Scene 04: "Made to work. Built for what’s next." — synchronized with collision & slab
  {
    id: "vo-scene04",
    file: "voiceover/scene04.mp3",
    from: 396,
    durationInFrames: 112,
    volume: 1.0,
  },

  // Scene 05: "After 10 PM Studio." — synchronized with camera shutter snap and framed lockup
  {
    id: "vo-scene05",
    file: "voiceover/scene05.mp3",
    from: 572,
    durationInFrames: 78,
    volume: 1.0,
  },

  // Scene 06: "after 10 pm dot x y z." — synchronized with minimal end card and white CTA pill
  {
    id: "vo-scene06",
    file: "voiceover/scene06.mp3",
    from: 662,
    durationInFrames: 58,
    volume: 1.0,
    playbackRate: 1.3,
  },
];

export const Voiceover: React.FC = () => {
  return (
    <>
      {VOICEOVER_CUES.map((cue) => (
        <Sequence
          key={cue.id}
          from={cue.from}
          durationInFrames={cue.durationInFrames}
          name={`VO: ${cue.id}`}
        >
          <Audio
            src={staticFile(cue.file)}
            volume={cue.volume}
            playbackRate={cue.playbackRate ?? 1}
          />
        </Sequence>
      ))}
    </>
  );
};
