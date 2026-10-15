import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../constants/theme";
import { GridOverlay } from "../components/common/GridOverlay";

export const Scene02Ideas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase breakdown:
  // 0-38: "THINK."
  // 38-78: "DESIGN."
  // 78-120: "BUILD."

  const isThink = frame < 38;
  const isDesign = frame >= 38 && frame < 78;
  const isBuild = frame >= 78;

  // --- 1. "THINK." Motion ---
  const thinkSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 220, mass: 0.8 },
  });
  const thinkScale = interpolate(
    frame,
    [0, 20, 32, 38],
    [1.3, 1.0, 1.0, 1.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const thinkX = interpolate(thinkSpring, [0, 1], [-240, 0]);
  const thinkOpacity = interpolate(frame, [0, 5, 34, 38], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- 2. "DESIGN." Motion ---
  const designFrame = frame - 38;
  const designSpring = spring({
    frame: designFrame,
    fps,
    config: { damping: 15, stiffness: 210, mass: 0.8 },
  });
  const designY = interpolate(designSpring, [0, 1], [-180, 0]);
  const designOutlineOffset = interpolate(
    spring({ frame: designFrame - 4, fps, config: { damping: 14, stiffness: 180 } }),
    [0, 0.6, 1],
    [32, 12, 0]
  );
  const designOpacity = interpolate(designFrame, [0, 4, 34, 39], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const designBoxScale = interpolate(designSpring, [0, 1], [0.85, 1]);

  // --- 3. "BUILD." Motion ---
  const buildFrame = frame - 78;
  const buildSpring = spring({
    frame: buildFrame,
    fps,
    config: { damping: 14, stiffness: 260, mass: 0.7 },
  });
  const buildScale = interpolate(buildSpring, [0, 1], [1.9, 1.0]);
  const buildOpacity = interpolate(buildFrame, [0, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const buildBarWidth = interpolate(
    spring({ frame: buildFrame - 4, fps, config: { damping: 18, stiffness: 180 } }),
    [0, 1],
    [0, 100]
  );

  const timecodeStr = `TC 00:04:${String(Math.floor(frame / 30)).padStart(2, "0")}:${String(
    frame % 30
  ).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: isDesign ? THEME.colors.secondaryBg : THEME.colors.background,
        overflow: "hidden",
      }}
    >
      <GridOverlay
        opacity={0.35}
        timecode={timecodeStr}
        sceneTag="02 // THE IDEAS"
        highlightColumnIndex={isThink ? 2 : isDesign ? 5 : 8}
      />

      {/* --- BEAT 1: "THINK." --- */}
      {isThink && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 70px",
            opacity: thinkOpacity,
            transform: `scale(${thinkScale})`,
            transformOrigin: "center center",
          }}
        >
          {/* Phase indicator badge */}
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.22em",
              color: THEME.colors.primaryOrange,
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                background: THEME.colors.primaryOrange,
                display: "inline-block",
              }}
            />
            01 / CONCEPTUAL ARCHITECTURE
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              transform: `translateX(${thinkX}px)`,
            }}
          >
            {/* Orange vertical block */}
            <div
              style={{
                width: "20px",
                height: "150px",
                background: THEME.colors.primaryOrange,
                marginRight: "28px",
              }}
            />

            <h1
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "168px",
                fontWeight: 900,
                color: THEME.colors.textPrimary,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
              }}
            >
              THINK<span style={{ color: THEME.colors.primaryOrange }}>.</span>
            </h1>
          </div>

          {/* Technical sub-panel */}
          <div
            style={{
              marginTop: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.18em",
              color: THEME.colors.textMuted,
            }}
          >
            <div>[ COGNITIVE FORM ] // SPEC: MAPPING PROBLEM SPACE</div>
            <div style={{ color: THEME.colors.primaryOrange }}>STATUS: RIGOROUS ARCHITECTURE</div>
          </div>
        </div>
      )}

      {/* --- BEAT 2: "DESIGN." --- */}
      {isDesign && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 50px",
            opacity: designOpacity,
          }}
        >
          {/* Animated UI Vector Bounding Box in Portrait */}
          <div
            style={{
              position: "relative",
              width: "100%",
              padding: "48px 36px",
              border: `1px dashed ${THEME.colors.primaryOrange}`,
              transform: `scale(${designBoxScale}) translateY(${designY}px)`,
              background: "rgba(10, 10, 10, 0.45)",
            }}
          >
            {/* Corner resize handle dots */}
            <div
              style={{
                position: "absolute",
                top: "-5px",
                left: "-5px",
                width: "10px",
                height: "10px",
                background: THEME.colors.primaryOrange,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                width: "10px",
                height: "10px",
                background: THEME.colors.primaryOrange,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                left: "-5px",
                width: "10px",
                height: "10px",
                background: THEME.colors.primaryOrange,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-5px",
                right: "-5px",
                width: "10px",
                height: "10px",
                background: THEME.colors.primaryOrange,
              }}
            />

            {/* Dimension label badge */}
            <div
              style={{
                position: "absolute",
                top: "-24px",
                left: "20px",
                fontFamily: THEME.fonts.mono,
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: THEME.colors.textDark,
                background: THEME.colors.primaryAccent,
                fontWeight: 700,
                padding: "2px 8px",
              }}
            >
              W: 980PX × H: 460PX // VECTOR-GRID
            </div>

            {/* Phase badge */}
            <div
              style={{
                fontFamily: THEME.fonts.mono,
                fontSize: "11px",
                letterSpacing: "0.22em",
                color: THEME.colors.primaryOrange,
                marginBottom: "16px",
                textAlign: "center",
              }}
            >
              02 / SYSTEM ARCHITECTURE & INTERFACE
            </div>

            {/* Layered / Stroked Typography */}
            <div style={{ position: "relative", textAlign: "center" }}>
              {/* Stroked layer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  fontFamily: THEME.fonts.display,
                  fontSize: "154px",
                  fontWeight: 900,
                  color: "transparent",
                  WebkitTextStroke: `2px ${THEME.colors.primaryOrange}`,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  transform: `translate(${designOutlineOffset}px, ${designOutlineOffset}px)`,
                  pointerEvents: "none",
                }}
              >
                DESIGN.
              </div>

              {/* Main solid typography */}
              <h1
                style={{
                  fontFamily: THEME.fonts.display,
                  fontSize: "154px",
                  fontWeight: 900,
                  color: THEME.colors.textPrimary,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                DESIGN<span style={{ color: THEME.colors.primaryOrange }}>.</span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* --- BEAT 3: "BUILD." --- */}
      {isBuild && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 70px",
            opacity: buildOpacity,
          }}
        >
          <div
            style={{
              fontFamily: THEME.fonts.mono,
              fontSize: "12px",
              letterSpacing: "0.25em",
              color: THEME.colors.primaryOrange,
              marginBottom: "18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                background: THEME.colors.primaryOrange,
                display: "inline-block",
              }}
            />
            03 / HIGH-PERFORMANCE CODE & HARDENED SYSTEMS
          </div>

          <div
            style={{
              transform: `scale(${buildScale})`,
              transformOrigin: "left center",
            }}
          >
            <h1
              style={{
                fontFamily: THEME.fonts.display,
                fontSize: "188px",
                fontWeight: 900,
                color: THEME.colors.textPrimary,
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
              }}
            >
              BUILD<span style={{ color: THEME.colors.primaryOrange }}>.</span>
            </h1>

            {/* Expanding Orange Foundation Bar */}
            <div
              style={{
                marginTop: "24px",
                height: "14px",
                width: `${buildBarWidth}%`,
                background: THEME.colors.primaryOrange,
              }}
            />
          </div>

          {/* Code / Engineering Tokens Stacked Vertically in Portrait */}
          <div
            style={{
              marginTop: "54px",
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
                padding: "16px 20px",
                border: `1px solid ${THEME.colors.borderSubtle}`,
                background: THEME.colors.cardBg,
                color: THEME.colors.textPrimary,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>STACK: TYPESCRIPT // RUST // REACT</span>
              <span style={{ color: THEME.colors.textMuted }}>[ HARDENED ]</span>
            </div>
            <div
              style={{
                padding: "16px 20px",
                border: `1px solid ${THEME.colors.borderSubtle}`,
                background: THEME.colors.cardBg,
                color: THEME.colors.textMuted,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>TARGET: ZERO LATENCY RUNTIME</span>
              <span style={{ color: THEME.colors.primaryOrange }}>[ VERIFIED ]</span>
            </div>
            <div
              style={{
                padding: "16px 20px",
                border: `1px solid ${THEME.colors.borderActive}`,
                background: THEME.colors.primaryAccent,
                color: THEME.colors.textDark,
                display: "flex",
                justifyContent: "space-between",
                fontWeight: 800,
              }}
            >
              <span>OUTPUT: DEPLOYMENT READY</span>
              <span>100% PASS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
