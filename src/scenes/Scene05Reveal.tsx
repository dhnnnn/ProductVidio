import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../constants/theme";
import { GridOverlay } from "../components/common/GridOverlay";

export const Scene05Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Inward convergence of corner markers toward (540, 960)
  const convergeProgress = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 220, mass: 0.7 },
  });
  const cornerDist = interpolate(convergeProgress, [0, 1], [480, 0]);

  // 2. Bold orange rectangle expansion and contraction (frames 10-60)
  // Expansion: frames 10-28
  const expandSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 220, mass: 0.7 },
  });
  const rectScaleX = interpolate(expandSpring, [0, 1], [0, 1]);
  const rectScaleY = interpolate(expandSpring, [0, 1], [0, 1]);

  // Contraction: frames 28-55
  const contractSpring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 18, stiffness: 180, mass: 0.8 },
  });
  const contractedW = interpolate(contractSpring, [0, 1], [1080, 940]);
  const contractedH = interpolate(contractSpring, [0, 1], [1920, 560]);
  const orangeBgOpacity = interpolate(contractSpring, [0, 0.4, 1], [1, 0.85, 0.08]);

  // 3. Typographic Reveal: AFTER10PM STUDIO (frames 32-120)
  const titleSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 16, stiffness: 190, mass: 0.8 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [70, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 0.3, 1], [0, 1, 1]);

  // Subtitle "STUDIO" reveal
  const studioSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, stiffness: 180, mass: 0.8 },
  });
  const studioY = interpolate(studioSpring, [0, 1], [36, 0]);
  const studioOpacity = interpolate(studioSpring, [0, 0.3, 1], [0, 1, 1]);

  // Corner brackets & hairline borders
  const bracketSpring = spring({
    frame: frame - 46,
    fps,
    config: { damping: 18, stiffness: 160 },
  });
  const bracketScale = interpolate(bracketSpring, [0, 1], [1.2, 1.0]);
  const bracketOpacity = interpolate(bracketSpring, [0, 0.3, 1], [0, 1, 1]);

  // Subtle finishing camera settling (frames 50-120)
  const cameraSettle = interpolate(frame, [50, 120], [1.025, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const timecodeStr = `TC 00:18:${String(Math.floor(frame / 30)).padStart(2, "0")}:${String(
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
        opacity={0.3}
        timecode={timecodeStr}
        sceneTag="05 // THE REVEAL"
        highlightColumnIndex={frame > 45 ? 6 : -1}
      />

      {/* Converging quadrant marks toward (540, 960) in portrait */}
      {frame < 30 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: `${960 - cornerDist}px`,
              left: `${540 - cornerDist}px`,
              width: "24px",
              height: "2px",
              background: THEME.colors.primaryOrange,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: `${960 - cornerDist}px`,
              right: `${540 - cornerDist}px`,
              width: "24px",
              height: "2px",
              background: THEME.colors.primaryOrange,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: `${960 - cornerDist}px`,
              left: `${540 - cornerDist}px`,
              width: "24px",
              height: "2px",
              background: THEME.colors.primaryOrange,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: `${960 - cornerDist}px`,
              right: `${540 - cornerDist}px`,
              width: "24px",
              height: "2px",
              background: THEME.colors.primaryOrange,
            }}
          />
        </div>
      )}

      {/* Expanding & Contracting Bold Orange Rectangle */}
      {frame >= 10 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: `${contractedW}px`,
            height: `${contractedH}px`,
            background: THEME.colors.primaryOrange,
            zIndex: 3,
            opacity: frame < 28 ? 1 : orangeBgOpacity,
            scale: `${rectScaleX} ${rectScaleY}`,
            border:
              frame >= 28 ? `1px solid ${THEME.colors.primaryOrange}` : "none",
          }}
        />
      )}

      {/* Central Typographic Lockup: AFTER10PM STUDIO in Portrait */}
      {frame >= 26 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 6,
            transform: `scale(${cameraSettle})`,
          }}
        >
          {/* Outer Registration Framing Box */}
          <div
            style={{
              position: "relative",
              width: "940px",
              padding: "54px 32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `scale(${bracketScale})`,
              opacity: bracketOpacity,
            }}
          >
            {/* Swiss Editorial Corner Brackets */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "28px",
                height: "28px",
                borderTop: `2px solid ${THEME.colors.primaryOrange}`,
                borderLeft: `2px solid ${THEME.colors.primaryOrange}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "28px",
                height: "28px",
                borderTop: `2px solid ${THEME.colors.primaryOrange}`,
                borderRight: `2px solid ${THEME.colors.primaryOrange}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "28px",
                height: "28px",
                borderBottom: `2px solid ${THEME.colors.primaryOrange}`,
                borderLeft: `2px solid ${THEME.colors.primaryOrange}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "28px",
                height: "28px",
                borderBottom: `2px solid ${THEME.colors.primaryOrange}`,
                borderRight: `2px solid ${THEME.colors.primaryOrange}`,
              }}
            />

            {/* Over-title badge */}
            <div
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: "11px",
                letterSpacing: "0.26em",
                color: THEME.colors.primaryOrange,
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                opacity: titleOpacity,
              }}
            >
              <span
                style={{
                  width: "16px",
                  height: "1px",
                  background: THEME.colors.primaryOrange,
                }}
              />
              INDEPENDENT DIGITAL PRODUCT STUDIO
              <span
                style={{
                  width: "16px",
                  height: "1px",
                  background: THEME.colors.primaryOrange,
                }}
              />
            </div>

            {/* Wordmark: AFTER10PM */}
            <div
              style={{
                overflow: "hidden",
                width: "100%",
                textAlign: "center",
              }}
            >
              <h1
                style={{
                  fontFamily: THEME.fonts.display,
                  fontSize: "128px",
                  fontWeight: 900,
                  color: THEME.colors.textPrimary,
                  letterSpacing: "-0.035em",
                  lineHeight: 0.95,
                  transform: `translateY(${titleY}px)`,
                  opacity: titleOpacity,
                }}
              >
                AFTER10PM
              </h1>
            </div>

            {/* Typographic Lockup: STUDIO with symmetrical horizontal framing rules */}
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                gap: "24px",
                width: "100%",
                justifyContent: "center",
                transform: `translateY(${studioY}px)`,
                opacity: studioOpacity,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  background: THEME.colors.primaryOrange,
                }}
              />
              <span
                style={{
                  fontFamily: THEME.fonts.display,
                  fontSize: "38px",
                  fontWeight: 800,
                  color: THEME.colors.primaryOrange,
                  letterSpacing: "0.38em",
                  marginRight: "-0.38em",
                }}
              >
                STUDIO
              </span>
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  background: THEME.colors.primaryOrange,
                }}
              />
            </div>

            {/* Sub-label coordinates */}
            <div
              style={{
                marginTop: "28px",
                fontFamily: THEME.fonts.mono,
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: THEME.colors.textMuted,
                display: "flex",
                gap: "20px",
                opacity: bracketOpacity,
              }}
            >
              <span>47.3769° N, 8.5417° E</span>
              <span>•</span>
              <span>ENGINEERED WITH INTENT</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
