import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../constants/theme";
import { GridOverlay } from "../components/common/GridOverlay";

export const Scene06EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Small orange element motion (frames 0 to 18)
  const dotSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 230, mass: 0.7 },
  });
  const dotX = interpolate(dotSpring, [0, 1], [-80, 0]);
  const dotOpacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Brand lockup entrance (frames 2 to 20)
  const textSpring = spring({
    frame: frame - 2,
    fps,
    config: { damping: 18, stiffness: 180, mass: 0.8 },
  });
  const textY = interpolate(textSpring, [0, 1], [30, 0]);
  const textOpacity = interpolate(textSpring, [0, 0.4, 1], [0, 0.8, 1]);

  // 3. Website pill reveal (frames 6 to 22)
  const urlSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 18, stiffness: 180, mass: 0.8 },
  });
  const urlY = interpolate(urlSpring, [0, 1], [24, 0]);
  const urlOpacity = interpolate(urlSpring, [0, 0.4, 1], [0, 0.8, 1]);

  const timecodeStr = `TC 00:22:${String(Math.floor(frame / 30)).padStart(2, "0")}:${String(
    frame % 30
  ).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: THEME.colors.background,
        overflow: "hidden",
      }}
    >
      <GridOverlay
        opacity={0.2}
        timecode={timecodeStr}
        sceneTag="06 // END CARD"
        showColumns={false}
        hideFooter={true}
      />

      {/* Center Minimal Composition */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        {/* Top small orange moving element */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            transform: `translateX(${dotX}px)`,
            opacity: dotOpacity,
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              background: THEME.colors.primaryOrange,
            }}
          />
          <span
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: THEME.colors.primaryOrange,
              textTransform: "uppercase",
            }}
          >
            AFTER10PM STUDIO
          </span>
        </div>

        {/* Primary Wordmark */}
        <div
          style={{
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "88px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            AFTER10PM STUDIO
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "24px",
              fontWeight: 400,
              color: THEME.colors.textMuted,
              letterSpacing: "0.02em",
              marginTop: "16px",
            }}
          >
            Digital products. Engineered with intent.
          </p>
        </div>

        {/* Divider hairline */}
        <div
          style={{
            width: "320px",
            height: "1px",
            background: THEME.colors.borderSubtle,
            margin: "36px 0",
            opacity: urlOpacity,
          }}
        />

        {/* Website & Social URL Section */}
        <div
          style={{
            transform: `translateY(${urlY}px)`,
            opacity: urlOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* Main Website URL */}
          <div
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "32px",
              fontWeight: 800,
              background: THEME.colors.primaryAccent,
              color: THEME.colors.textDark,
              padding: "16px 36px",
              borderRadius: "999px",
              letterSpacing: "-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 8px 32px rgba(255, 255, 255, 0.12)",
            }}
          >
            <span>after10pm.xyz</span>
            <span style={{ fontSize: "26px" }}>↗</span>
          </div>

          {/* Instagram Handle */}
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "13px",
              letterSpacing: "0.18em",
              color: THEME.colors.textMuted,
            }}
          >
            INSTAGRAM: @AFT10PM
          </div>
        </div>
      </div>

      {/* Bottom Editorial Legal / Copyright Stamp */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "60px",
          right: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          fontFamily: THEME.fonts.mono,
          fontSize: "10px",
          letterSpacing: "0.2em",
          color: THEME.colors.textDim,
          opacity: 0.8,
          textAlign: "center",
        }}
      >
        <div>© AFTER10PM STUDIO. ALL RIGHTS RESERVED.</div>
        <div>INDEPENDENT DIGITAL PRODUCT & SOFTWARE DEVELOPMENT</div>
      </div>
    </div>
  );
};
