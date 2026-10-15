import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../constants/theme";
import { GridOverlay } from "../components/common/GridOverlay";

export const Scene03Process: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Headline Entrance: "IDEAS INTO DIGITAL PRODUCTS."
  const headSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 200, mass: 0.8 },
  });
  const headY = interpolate(headSpring, [0, 1], [-60, 0]);
  const headOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Browser Window Outline Drawing (frames 10-45)
  const windowProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 20, stiffness: 140, mass: 0.9 },
  });
  const strokeDashoffset = interpolate(windowProgress, [0, 1], [4600, 0]);

  // 3. Code Lines Reveal (frames 25-65)
  const codeLines = [
    { text: "// AFTER10PM PRODUCT COMPONENT", color: THEME.colors.textDim },
    { text: "const DigitalProduct = createModule({", color: THEME.colors.textPrimary },
    { text: "  architecture: 'MODULAR_SYSTEM',", color: THEME.colors.primaryOrange },
    { text: "  engineering: 'INTENT_DRIVEN',", color: THEME.colors.textMuted },
    { text: "  performance: 100,", color: THEME.colors.primaryOrange },
    { text: "});", color: THEME.colors.textPrimary },
  ];

  // 4. Morph from Code to UI (frames 65-95)
  const morphProgress = spring({
    frame: frame - 65,
    fps,
    config: { damping: 18, stiffness: 160 },
  });

  // 5. Card 1 (Analytics) entrance (frames 40-75)
  const card1Spring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 16, stiffness: 190, mass: 0.8 },
  });

  // 6. Card 2 (Controls) entrance (frames 55-90)
  const card2Spring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 16, stiffness: 190, mass: 0.8 },
  });

  // 7. Orange modular cursor block moving through composition (frames 50-135)
  const cursorProgress = interpolate(frame, [50, 75, 100, 130], [0, 1, 2, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const cursorX = interpolate(cursorProgress, [0, 1, 2, 3], [40, 480, 40, 520]);
  const cursorY = interpolate(cursorProgress, [0, 1, 2, 3], [120, 320, 640, 940]);
  const cursorW = interpolate(cursorProgress, [0, 1, 2, 3], [180, 280, 360, 320]);
  const cursorH = interpolate(cursorProgress, [0, 1, 2, 3], [40, 44, 48, 44]);

  // Metric counter animation (99.98%)
  const metricVal = interpolate(frame, [45, 95], [0, 99.98], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }).toFixed(2);

  // Active tab toggle state
  const activeTab = frame < 85 ? 0 : frame < 115 ? 1 : 2;

  const timecodeStr = `TC 00:08:${String(Math.floor(frame / 30)).padStart(2, "0")}:${String(
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
        sceneTag="03 // THE PROCESS"
        highlightColumnIndex={activeTab * 4 + 1}
      />

      {/* Top Main Headline: "IDEAS INTO DIGITAL PRODUCTS." Stacked in Portrait */}
      <div
        style={{
          position: "absolute",
          top: "120px",
          left: "60px",
          right: "60px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 10,
          opacity: headOpacity,
          transform: `translateY(${headY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: THEME.fonts.mono,
            fontSize: "11px",
            letterSpacing: "0.22em",
            color: THEME.colors.primaryOrange,
          }}
        >
          TRANSFORMATION PIPELINE // FRAMEWORK
        </div>
        <h2
          style={{
            fontFamily: THEME.fonts.display,
            fontSize: "68px",
            fontWeight: 800,
            color: THEME.colors.textPrimary,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          IDEAS INTO
          <br />
          DIGITAL PRODUCTS<span style={{ color: THEME.colors.primaryOrange }}>.</span>
        </h2>
      </div>

      {/* SVG Outline for the Vertical Browser Frame (1080x1920) */}
      <svg
        style={{
          position: "absolute",
          top: "320px",
          left: "60px",
          width: "960px",
          height: "1440px",
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <rect
          x="1"
          y="1"
          width="958"
          height="1438"
          fill="rgba(20, 20, 20, 0.7)"
          stroke={THEME.colors.borderMedium}
          strokeWidth="2"
          strokeDasharray="4600"
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Browser Content Canvas */}
      {frame >= 18 && (
        <div
          style={{
            position: "absolute",
            top: "322px",
            left: "62px",
            width: "956px",
            height: "1436px",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            opacity: interpolate(windowProgress, [0.3, 1], [0, 1]),
          }}
        >
          {/* Browser Header Bar */}
          <div
            style={{
              height: "48px",
              borderBottom: `1px solid ${THEME.colors.borderSubtle}`,
              display: "flex",
              alignItems: "center",
              padding: "0 18px",
              gap: "14px",
              background: THEME.colors.secondaryBg,
            }}
          >
            {/* Window control dots */}
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: THEME.colors.primaryOrange,
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: THEME.colors.borderMedium,
                }}
              />
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: THEME.colors.borderMedium,
                }}
              />
            </div>

            {/* Address Bar Pill */}
            <div
              style={{
                marginLeft: "12px",
                padding: "6px 14px",
                borderRadius: "4px",
                background: THEME.colors.cardBg,
                border: `1px solid ${THEME.colors.borderSubtle}`,
                fontFamily: THEME.fonts.mono,
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: THEME.colors.textPrimary,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flex: 1,
                maxWidth: "360px",
              }}
            >
              <span style={{ color: THEME.colors.primaryOrange }}>https://</span>
              <span>after10pm.xyz/engine</span>
              <span
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "12px",
                  background: THEME.colors.primaryOrange,
                  marginLeft: "auto",
                }}
              />
            </div>

            <div
              style={{
                marginLeft: "auto",
                fontFamily: THEME.fonts.mono,
                fontSize: "10px",
                color: THEME.colors.textMuted,
                letterSpacing: "0.15em",
              }}
            >
              PROD // REACT 19
            </div>
          </div>

          {/* Browser Workspace Layout (Vertical Stack for 9:16) */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              gap: "24px",
              position: "relative",
            }}
          >
            {/* Panel 1: Code / Syntax Inspector */}
            <div
              style={{
                flex: 1,
                background: THEME.colors.cardBg,
                border: `1px solid ${THEME.colors.borderSubtle}`,
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  color: THEME.colors.textMuted,
                  marginBottom: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${THEME.colors.borderSubtle}`,
                  paddingBottom: "10px",
                }}
              >
                <span>ARCHITECTURE.TS</span>
                <span style={{ color: THEME.colors.primaryOrange }}>[ COMPILED ]</span>
              </div>

              {/* Monospace Code Lines */}
              <div
                style={{
                  fontFamily: THEME.fonts.mono,
                  fontSize: "13px",
                  lineHeight: "2.1",
                  opacity: interpolate(morphProgress, [0, 0.9], [1, 0.25]),
                }}
              >
                {codeLines.map((line, i) => {
                  const lineReveal = interpolate(
                    frame - (25 + i * 5),
                    [0, 8],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  );
                  return (
                    <div
                      key={i}
                      style={{
                        color: line.color,
                        opacity: lineReveal,
                        transform: `translateX(${(1 - lineReveal) * -12}px)`,
                      }}
                    >
                      <span
                        style={{
                          color: THEME.colors.textDim,
                          marginRight: "14px",
                          userSelect: "none",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {line.text}
                    </div>
                  );
                })}
              </div>

              {/* Scanning / Compiling Line */}
              {frame >= 60 && frame < 95 && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${interpolate(frame, [60, 95], [10, 85])}%`,
                    height: "2px",
                    background: THEME.colors.primaryOrange,
                    boxShadow: `0 0 12px ${THEME.colors.primaryOrange}`,
                  }}
                />
              )}

              {/* Resulting UI Component preview resolved from code */}
              <div
                style={{
                  marginTop: "auto",
                  padding: "16px",
                  background: THEME.colors.secondaryBg,
                  border: `1px solid ${
                    frame > 75 ? THEME.colors.primaryOrange : THEME.colors.borderSubtle
                  }`,
                  opacity: interpolate(morphProgress, [0.3, 1], [0, 1]),
                  transform: `translateY(${interpolate(morphProgress, [0, 1], [20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: "11px",
                      color: THEME.colors.textPrimary,
                    }}
                  >
                    RESOLVED UI COMPONENT
                  </span>
                  <span
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: "10px",
                      background: THEME.colors.primaryOrange,
                      color: THEME.colors.textDark,
                      padding: "2px 6px",
                      fontWeight: 700,
                    }}
                  >
                    ACTIVE
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: "38px",
                      background: THEME.colors.cardBg,
                      border: `1px solid ${THEME.colors.borderSubtle}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: THEME.fonts.mono,
                      fontSize: "11px",
                      color: THEME.colors.textPrimary,
                    }}
                  >
                    BUTTON.PRIMARY
                  </div>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      background: THEME.colors.primaryOrange,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: THEME.colors.textDark,
                      fontWeight: 700,
                    }}
                  >
                    →
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: UI Assembly Cards (Data Metric & Tab Controls) */}
            <div
              style={{
                flex: 1.1,
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Card 1: Performance Metric & Data Stream */}
              <div
                style={{
                  flex: 1,
                  background: THEME.colors.cardBg,
                  border: `1px solid ${THEME.colors.borderSubtle}`,
                  padding: "22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transform: `scale(${card1Spring})`,
                  opacity: interpolate(card1Spring, [0, 1], [0, 1]),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      color: THEME.colors.textMuted,
                    }}
                  >
                    SYSTEM BENCHMARK // FIDELITY
                  </span>
                  <span
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: "11px",
                      color: THEME.colors.primaryOrange,
                    }}
                  >
                    ● 30 FPS REALTIME
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "14px",
                    margin: "12px 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: THEME.fonts.display,
                      fontSize: "64px",
                      fontWeight: 800,
                      color: THEME.colors.textPrimary,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {metricVal}%
                  </span>
                  <span
                    style={{
                      fontFamily: THEME.fonts.mono,
                      fontSize: "12px",
                      color: THEME.colors.primaryOrange,
                      fontWeight: 700,
                    }}
                  >
                    OPTIMAL PERFORMANCE
                  </span>
                </div>

                {/* Animated Graphic Bar Chart */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(16, 1fr)",
                    gap: "4px",
                    alignItems: "flex-end",
                    height: "44px",
                  }}
                >
                  {Array.from({ length: 16 }).map((_, barIdx) => {
                    const barHeight = interpolate(
                      frame - (45 + barIdx * 2),
                      [0, 15],
                      [8, (Math.sin(barIdx * 0.5 + frame * 0.1) * 0.35 + 0.65) * 40],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    );
                    const isOrange = barIdx >= 12;
                    return (
                      <div
                        key={barIdx}
                        style={{
                          height: `${barHeight}px`,
                          background: isOrange
                            ? THEME.colors.primaryOrange
                            : THEME.colors.borderMedium,
                          borderRadius: "1px",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Card 2: Interactive Tabs & Controls */}
              <div
                style={{
                  flex: 1,
                  background: THEME.colors.cardBg,
                  border: `1px solid ${THEME.colors.borderSubtle}`,
                  padding: "22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transform: `scale(${card2Spring})`,
                  opacity: interpolate(card2Spring, [0, 1], [0, 1]),
                }}
              >
                {/* Segmented Control Tabs */}
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    background: THEME.colors.secondaryBg,
                    padding: "4px",
                    borderRadius: "2px",
                  }}
                >
                  {["INTERFACE", "LOGIC", "SYSTEM"].map((tab, idx) => (
                    <div
                      key={tab}
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        textAlign: "center",
                        fontFamily: THEME.fonts.mono,
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        fontWeight: 700,
                        background:
                          activeTab === idx
                            ? THEME.colors.primaryOrange
                            : "transparent",
                        color:
                          activeTab === idx
                            ? THEME.colors.textDark
                            : THEME.colors.textMuted,
                      }}
                    >
                      {tab}
                    </div>
                  ))}
                </div>

                {/* Vector Sliders & Toggles */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      border: `1px solid ${THEME.colors.borderSubtle}`,
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: THEME.fonts.mono,
                        fontSize: "10px",
                        color: THEME.colors.textMuted,
                      }}
                    >
                      <span>GRID</span>
                      <span style={{ color: THEME.colors.primaryOrange }}>12 COL</span>
                    </div>
                    <div
                      style={{
                        height: "4px",
                        background: THEME.colors.borderSubtle,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          width: "75%",
                          height: "100%",
                          background: THEME.colors.primaryOrange,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      border: `1px solid ${THEME.colors.borderSubtle}`,
                      padding: "12px 14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: THEME.fonts.mono,
                        fontSize: "10px",
                        color: THEME.colors.textMuted,
                      }}
                    >
                      ENGINE
                    </span>
                    <div
                      style={{
                        width: "36px",
                        height: "18px",
                        background: THEME.colors.primaryOrange,
                        borderRadius: "9px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        padding: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          background: THEME.colors.textPrimary,
                          marginLeft: "auto",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Moving Orange Modular Focus Box */}
            {frame >= 50 && (
              <div
                style={{
                  position: "absolute",
                  left: `${cursorX}px`,
                  top: `${cursorY}px`,
                  width: `${cursorW}px`,
                  height: `${cursorH}px`,
                  border: `2px solid ${THEME.colors.primaryOrange}`,
                  background: THEME.colors.orangeSubtle,
                  pointerEvents: "none",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: "8px",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    background: THEME.colors.primaryOrange,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
