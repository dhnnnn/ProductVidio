import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../constants/theme";
import { GridOverlay } from "../components/common/GridOverlay";

export const Scene01Hour: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Initial clock entrance (frames 0-30)
  const clockSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 16, stiffness: 180, mass: 0.8 },
  });
  const clockOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Blinking colon for the digital clock
  const isBlinkOn = frame < 30 ? Math.floor(frame / 6) % 2 === 0 : true;

  // Phase 2: Splitting the numbers apart (frames 30-65)
  const splitProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 18, stiffness: 140, mass: 0.9 },
  });

  const numTopY = interpolate(splitProgress, [0, 1], [0, -380]);
  const numBottomY = interpolate(splitProgress, [0, 1], [0, 380]);
  const numScale = interpolate(splitProgress, [0, 1], [1, 3.2]);
  const numOpacity = interpolate(splitProgress, [0, 0.4, 1], [1, 0.4, 0.08]);

  // Phase 3: Orange rectangle sweep (frames 42-80)
  const sweepProgress = spring({
    frame: frame - 42,
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.7 },
  });

  const sweepX = interpolate(sweepProgress, [0, 1], [-1200, 1200]);
  const sweepWidth = interpolate(sweepProgress, [0, 0.5, 1], [180, 700, 180]);

  // Phase 4: Staggered reveal of "IT'S AFTER 10 PM."
  // Word 1: "IT'S"
  const itsSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 17, stiffness: 200, mass: 0.7 },
  });
  const itsY = interpolate(itsSpring, [0, 1], [100, 0]);
  const itsOpacity = interpolate(itsSpring, [0, 0.3, 1], [0, 1, 1]);

  // Word 2: "AFTER"
  const afterSpring = spring({
    frame: frame - 56,
    fps,
    config: { damping: 17, stiffness: 200, mass: 0.7 },
  });
  const afterY = interpolate(afterSpring, [0, 1], [160, 0]);
  const afterOpacity = interpolate(afterSpring, [0, 0.3, 1], [0, 1, 1]);

  // Word 3: "10 PM."
  const tenSpring = spring({
    frame: frame - 62,
    fps,
    config: { damping: 17, stiffness: 200, mass: 0.7 },
  });
  const tenY = interpolate(tenSpring, [0, 1], [160, 0]);
  const tenOpacity = interpolate(tenSpring, [0, 0.3, 1], [0, 1, 1]);

  // Accent line expansion (frames 68-100)
  const lineProgress = spring({
    frame: frame - 68,
    fps,
    config: { damping: 22, stiffness: 160 },
  });

  // Clock dial icon (indicates 10:00 / 22:00)
  const dialRotation = interpolate(
    spring({ frame: frame - 60, fps, config: { damping: 18, stiffness: 120 } }),
    [0, 1],
    [0, 300]
  );

  const timecodeStr = `TC 00:00:${String(Math.floor(frame / 30)).padStart(2, "0")}:${String(
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
        sceneTag="01 // THE HOUR"
        highlightColumnIndex={frame > 45 ? 1 : -1}
      />

      {/* Background Split Oversized Typographic Watermarks "22" and "00" in Portrait */}
      {frame >= 28 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "180px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              opacity: numOpacity,
              transform: `translateY(${numTopY}px) scale(${numScale})`,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            22
          </div>
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "180px",
              fontWeight: 800,
              color: THEME.colors.textPrimary,
              opacity: numOpacity,
              transform: `translateY(${numBottomY}px) scale(${numScale})`,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            00
          </div>
        </div>
      )}

      {/* Initial Center Digital Clock (frames 0 to 45) */}
      {frame < 45 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 4,
            opacity: clockOpacity,
            transform: `scale(${clockSpring})`,
          }}
        >
          <div
            style={{
              padding: "18px 40px",
              border: `1px solid ${THEME.colors.borderMedium}`,
              background: "rgba(20, 20, 20, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: THEME.colors.primaryOrange,
                marginRight: "16px",
              }}
            />
            <span
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: "52px",
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                letterSpacing: "0.12em",
              }}
            >
              22
            </span>
            <span
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: "52px",
                fontWeight: 700,
                color: isBlinkOn ? THEME.colors.primaryOrange : "transparent",
                margin: "0 2px",
              }}
            >
              :
            </span>
            <span
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: "52px",
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                letterSpacing: "0.12em",
              }}
            >
              00
            </span>
            <span
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: "16px",
                fontWeight: 500,
                color: THEME.colors.textMuted,
                marginLeft: "14px",
                letterSpacing: "0.2em",
              }}
            >
              PM
            </span>
          </div>
        </div>
      )}

      {/* Kinetic Orange Sweep Beam */}
      {frame >= 42 && frame < 85 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${sweepX}px`,
            width: `${sweepWidth}px`,
            background: THEME.colors.primaryOrange,
            zIndex: 5,
            opacity: 0.85,
            transform: "skewX(-14deg)",
          }}
        />
      )}

      {/* Main Headline Reveal: "IT'S AFTER 10 PM." Stacked for 9:16 Portrait */}
      {frame >= 48 && (
        <div
          style={{
            position: "absolute",
            inset: "0 70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 6,
          }}
        >
          {/* Top Label */}
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.25em",
              color: THEME.colors.primaryOrange,
              textTransform: "uppercase",
              marginBottom: "28px",
              opacity: itsOpacity,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "2px",
                background: THEME.colors.primaryOrange,
              }}
            />
            TIME-ZONE : 22:00:00 // STUDIO ACTIVE
          </div>

          {/* Masked Line 1: IT'S */}
          <div
            style={{
              overflow: "hidden",
              height: "100px",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "92px",
                fontWeight: 700,
                color: THEME.colors.textMuted,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                transform: `translateY(${itsY}px)`,
                opacity: itsOpacity,
              }}
            >
              IT’S
            </div>
          </div>

          {/* Masked Line 2: AFTER */}
          <div
            style={{
              overflow: "hidden",
              height: "180px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "176px",
                fontWeight: 900,
                color: THEME.colors.textPrimary,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                transform: `translateY(${afterY}px)`,
                opacity: afterOpacity,
              }}
            >
              AFTER
            </div>
          </div>

          {/* Masked Line 3: 10 PM. + Clock Reticle */}
          <div
            style={{
              overflow: "hidden",
              height: "180px",
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "176px",
                fontWeight: 900,
                color: THEME.colors.primaryOrange,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                transform: `translateY(${tenY}px)`,
                opacity: tenOpacity,
                display: "flex",
                alignItems: "baseline",
                gap: "8px",
              }}
            >
              10 PM<span style={{ color: THEME.colors.textPrimary }}>.</span>
            </div>

            {/* Swiss Clock Reticle */}
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                border: `2px solid ${THEME.colors.borderMedium}`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: tenOpacity,
                transform: `translateY(${tenY}px)`,
              }}
            >
              {/* Dial tick marks */}
              <div
                style={{
                  position: "absolute",
                  inset: "6px",
                  borderRadius: "50%",
                  border: `1px dashed ${THEME.colors.borderSubtle}`,
                }}
              />
              {/* Hour hand pointing at 10 (300 deg) */}
              <div
                style={{
                  position: "absolute",
                  width: "3px",
                  height: "36px",
                  background: THEME.colors.primaryOrange,
                  top: "12px",
                  transformOrigin: "bottom center",
                  transform: `rotate(${dialRotation}deg)`,
                }}
              />
              {/* Center pivot */}
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: THEME.colors.textPrimary,
                  zIndex: 2,
                }}
              />
            </div>
          </div>

          {/* Horizontal Swiss Accent Ruler */}
          <div
            style={{
              marginTop: "40px",
              width: "100%",
              height: "2px",
              background: THEME.colors.borderSubtle,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${lineProgress * 100}%`,
                background: THEME.colors.primaryOrange,
              }}
            />
          </div>

          {/* Subtext description in Swiss grid */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.15em",
              color: THEME.colors.textMuted,
              opacity: interpolate(lineProgress, [0.3, 1], [0, 1]),
            }}
          >
            <div>WHERE DIGITAL PRODUCTS ARE ENGINEERED</div>
            <div style={{ color: THEME.colors.primaryOrange }}>
              AFTER10PM STUDIO // 01.INIT
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
