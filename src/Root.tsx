import React from "react";
import { Composition } from "remotion";
import { After10PMBrandFilm } from "./Composition";
import { THEME } from "./constants/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="After10PMBrandFilm"
        component={After10PMBrandFilm}
        durationInFrames={THEME.video.totalFrames}
        fps={THEME.video.fps}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
