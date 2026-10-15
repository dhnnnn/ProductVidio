import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../constants/theme";
import { GridOverlay } from "../components/common/GridOverlay";

export const Scene04Build: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: "MADE TO WORK." (frames 0 to 75)
  // Part 2: "BUILT FOR WHAT'S NEXT." (frames 75 to 150)
  const isPart1 = frame < 75;

  // --- Part 1 Animations ---
  // Geometric collision planes (frames 0-25)
  const collideSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.8 },
  });
  const planeLeftX = interpolate(collideSpring, [0, 1], [-540, 0]);
  const planeRightX = interpolate(collideSpring, [0, 1], [540, 0]);

  // "MADE TO"
  const madeSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 16, stiffness: 200, mass: 0.7 },
  });
  const madeY = interpolate(madeSpring, [0, 1], [140, 0]);

  // "WORK."
  const workSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 230, mass: 0.8 },
  });
  const workY = interpolate(workSpring, [0, 1], [160, 0]);
  const workScale = interpolate(workSpring, [0, 1], [1.3, 1.0]);

  // Rotating calibration reticle
  const reticleAngle = interpolate(frame, [0, 75], [0, 180]);

  // --- Part 2 Animations ---
  const part2Frame = frame - 75;

  // "BUILT FOR"
  const builtForSpring = spring({
    frame: part2Frame,
    fps,
    config: { damping: 15, stiffness: 220, mass: 0.8 },
  });
  const builtForX = interpolate(builtForSpring, [0, 1], [-300, 0]);

  // "WHAT'S NEXT."
  const whatsNextSpring = spring({
    frame: part2Frame - 8,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.8 },
  });
  const whatsNextY = interpolate(whatsNextSpring, [0, 1], [150, 0]);

  // Expanding orange foundation slab
  const slabWidth = interpolate(
    spring({ frame: part2Frame - 12, fps, config: { damping: 18, stiffness: 160 } }),
    [0, 1],
    [0, 100]
  );

  // Crescendo convergence towards center (frames 130 to 150)
  const convergeProgress = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const convergeScale = interpolate(convergeProgress, [0, 1], [1, 0.45]);
  const convergeOpacity = interpolate(convergeProgress, [0, 0.8, 1], [1, 0.9, 0]);

  const timecodeStr = `TC 00:13:${String(Math.floor(frame / 30)).padStart(2, "0")}:${String(
    frame % 30
  ).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: isPart1 ? THEME.colors.background : THEME.colors.secondaryBg,
        overflow: "hidden",
      }}
    >
      <GridOverlay
        opacity={0.35}
        timecode={timecodeStr}
        sceneTag="04 // THE BUILD"
        highlightColumnIndex={isPart1 ? 3 : 7}
      />

      {/* --- PART 1: "MADE TO WORK." --- */}
      {isPart1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 70px",
          }}
        >
          {/* Colliding Geometric Planes Background Accent */}
          <div
            style={{
              position: "absolute",
              top: "28%",
              left: "40px",
              width: "140px",
              height: "4px",
              background: THEME.colors.primaryOrange,
              transform: `translateX(${planeLeftX}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "32%",
              right: "40px",
              width: "200px",
              height: "4px",
              background: THEME.colors.primaryOrange,
              transform: `translateX(${planeRightX}px)`,
            }}
          />

          {/* Phase Tag */}
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.22em",
              color: THEME.colors.primaryOrange,
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: THEME.colors.primaryOrange,
              }}
            />
            VALIDATION // RIGID ENGINEERING SPECIFICATION
          </div>

          {/* Stacked Rows for 9:16 Portrait */}
          {/* Row 1: MADE TO */}
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "138px",
                fontWeight: 800,
                color: THEME.colors.textPrimary,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                transform: `translateY(${madeY}px)`,
                display: "flex",
                gap: "24px",
              }}
            >
              <span>MADE</span>
              <span style={{ color: THEME.colors.textMuted }}>TO</span>
            </div>
          </div>

          {/* Row 2: WORK. */}
          <div style={{ overflow: "hidden", marginTop: "8px" }}>
            <div
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "176px",
                fontWeight: 900,
                color: THEME.colors.primaryOrange,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                transform: `translateY(${workY}px) scale(${workScale})`,
                transformOrigin: "bottom left",
              }}
            >
              WORK<span style={{ color: THEME.colors.textPrimary }}>.</span>
            </div>
          </div>

          {/* Precision telemetry block and rotating reticle */}
          <div
            style={{
              marginTop: "54px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${THEME.colors.borderSubtle}`,
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontFamily: THEME.fonts.mono,
                fontSize: "12px",
                letterSpacing: "0.15em",
                color: THEME.colors.textMuted,
              }}
            >
              <div>RELIABILITY: 99.99% // TOLERANCE: ZERO FLUFF</div>
              <div style={{ color: THEME.colors.primaryOrange }}>STATUS: VERIFIED PRODUCTION RUNTIME</div>
            </div>

            {/* Rotating SVG Calibration Reticle */}
            <div
              style={{
                width: "48px",
                height: "48px",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                style={{
                  transform: `rotate(${reticleAngle}deg)`,
                }}
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke={THEME.colors.borderMedium}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <line
                  x1="24"
                  y1="0"
                  x2="24"
                  y2="48"
                  stroke={THEME.colors.primaryOrange}
                  strokeWidth="1.5"
                />
                <line
                  x1="0"
                  y1="24"
                  x2="48"
                  y2="24"
                  stroke={THEME.colors.primaryOrange}
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* --- PART 2: "BUILT FOR WHAT'S NEXT." (with Crescendo Convergence) --- */}
      {!isPart1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 70px",
            transform: `scale(${convergeScale})`,
            transformOrigin: "center center",
            opacity: convergeOpacity,
          }}
        >
          {/* Editorial Category */}
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.25em",
              color: THEME.colors.primaryOrange,
              marginBottom: "18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                background: THEME.colors.primaryOrange,
              }}
            />
            HORIZON MATRIX // EVOLUTIONARY READINESS
          </div>

          {/* Line 1: BUILT FOR */}
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <h2
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "108px",
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                transform: `translateX(${builtForX}px)`,
              }}
            >
              BUILT FOR
            </h2>
          </div>

          {/* Line 2: WHAT'S NEXT. */}
          <div
            style={{
              overflow: "hidden",
              marginTop: "10px",
            }}
          >
            <h1
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "154px",
                fontWeight: 900,
                color: THEME.colors.primaryOrange,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                transform: `translateY(${whatsNextY}px)`,
              }}
            >
              WHAT’S NEXT<span style={{ color: THEME.colors.textPrimary }}>.</span>
            </h1>
          </div>

          {/* Expanding Foundation Slab */}
          <div
            style={{
              marginTop: "28px",
              height: "12px",
              width: `${slabWidth}%`,
              background: THEME.colors.primaryOrange,
            }}
          />

          {/* Telemetry and Specs Stacked in Portrait */}
          <div
            style={{
              marginTop: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.15em",
            }}
          >
            <div
              style={{
                borderLeft: `2px solid ${THEME.colors.primaryOrange}`,
                paddingLeft: "16px",
                color: THEME.colors.textPrimary,
              }}
            >
              SYSTEM: ADAPTIVE ARCHITECTURE
            </div>
            <div
              style={{
                borderLeft: `2px solid ${THEME.colors.borderMedium}`,
                paddingLeft: "16px",
                color: THEME.colors.textMuted,
              }}
            >
              SCALE: GLOBAL ENTERPRISE GRADE
            </div>
            <div
              style={{
                borderLeft: `2px solid ${THEME.colors.borderMedium}`,
                paddingLeft: "16px",
                color: THEME.colors.textMuted,
              }}
            >
              AFTER10PM DIGITAL PRODUCT LAB
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
