import React from "react";
import { Sequence } from "remotion";
import { THEME } from "./constants/theme";
import { FontLoader } from "./components/common/FontLoader";
import { NoiseOverlay } from "./components/common/NoiseOverlay";
import { Scene01Hour } from "./scenes/Scene01Hour";
import { Scene02Ideas } from "./scenes/Scene02Ideas";
import { Scene03Process } from "./scenes/Scene03Process";
import { Scene04Build } from "./scenes/Scene04Build";
import { Scene05Reveal } from "./scenes/Scene05Reveal";
import { Scene06EndCard } from "./scenes/Scene06EndCard";
import { SoundDesign } from "./components/audio/SoundDesign";
import { Voiceover } from "./components/audio/Voiceover";

export const After10PMBrandFilm: React.FC = () => {
  const { sceneFrames } = THEME;

  return (
    <FontLoader>
      <div
        style={{
          position: "relative",
          width: THEME.video.width,
          height: THEME.video.height,
          backgroundColor: THEME.colors.background,
          overflow: "hidden",
        }}
      >
        {/* Scene 01: THE HOUR (0–4s / frames 0–120) */}
        <Sequence
          from={sceneFrames.scene01.start}
          durationInFrames={sceneFrames.scene01.duration}
          name="Scene 01: THE HOUR"
        >
          <Scene01Hour />
        </Sequence>

        {/* Scene 02: THE IDEAS (4–8s / frames 120–240) */}
        <Sequence
          from={sceneFrames.scene02.start}
          durationInFrames={sceneFrames.scene02.duration}
          name="Scene 02: THE IDEAS"
        >
          <Scene02Ideas />
        </Sequence>

        {/* Scene 03: THE PROCESS (8–13s / frames 240–390) */}
        <Sequence
          from={sceneFrames.scene03.start}
          durationInFrames={sceneFrames.scene03.duration}
          name="Scene 03: THE PROCESS"
        >
          <Scene03Process />
        </Sequence>

        {/* Scene 04: THE BUILD (13–18s / frames 390–540) */}
        <Sequence
          from={sceneFrames.scene04.start}
          durationInFrames={sceneFrames.scene04.duration}
          name="Scene 04: THE BUILD"
        >
          <Scene04Build />
        </Sequence>

        {/* Scene 05: THE REVEAL (18–22s / frames 540–660) */}
        <Sequence
          from={sceneFrames.scene05.start}
          durationInFrames={sceneFrames.scene05.duration}
          name="Scene 05: THE REVEAL"
        >
          <Scene05Reveal />
        </Sequence>

        {/* Scene 06: THE END CARD (22–24s / frames 660–720) */}
        <Sequence
          from={sceneFrames.scene06.start}
          durationInFrames={sceneFrames.scene06.duration}
          name="Scene 06: THE END CARD"
        >
          <Scene06EndCard />
        </Sequence>

        {/* Master Voiceover Track (Female Neural Voice) */}
        <Voiceover />

        {/* Master Sound Design & SFX Track */}
        <SoundDesign />

        {/* Subtle, cinema-grade film grain texture */}
        <NoiseOverlay opacity={0.038} />
      </div>
    </FontLoader>
  );
};
