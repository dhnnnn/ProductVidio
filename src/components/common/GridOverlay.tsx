import React from "react";
import { THEME } from "../../constants/theme";

interface GridOverlayProps {
  opacity?: number;
  showColumns?: boolean;
  highlightColumnIndex?: number;
  timecode?: string;
  sceneTag?: string;
  hideFooter?: boolean;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  opacity = 0.35,
  showColumns = true,
  highlightColumnIndex = -1,
  timecode,
  sceneTag,
  hideFooter = false,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity,
      }}
    >
      {/* 12-Column Swiss Grid Guides */}
      {showColumns && (
        <div
          style={{
            position: "absolute",
            inset: "0 60px",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "14px",
            height: "100%",
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: "100%",
                borderLeft: `1px solid ${
                  i === highlightColumnIndex
                    ? THEME.colors.primaryOrange
                    : THEME.colors.borderSubtle
                }`,
                borderRight:
                  i === 11
                    ? `1px solid ${
                        i === highlightColumnIndex
                          ? THEME.colors.primaryOrange
                          : THEME.colors.borderSubtle
                      }`
                    : "none",
                background:
                  i === highlightColumnIndex
                    ? THEME.colors.orangeSubtle
                    : "transparent",
              }}
            />
          ))}
        </div>
      )}

      {/* Horizontal subtle guide rules */}
      <div
        style={{
          position: "absolute",
          top: "120px",
          left: "40px",
          right: "40px",
          height: "1px",
          background: THEME.colors.borderSubtle,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: "40px",
          right: "40px",
          height: "1px",
          background: THEME.colors.borderSubtle,
        }}
      />

      {/* Swiss Corner Registration Marks */}
      <CornerCross top={40} left={40} />
      <CornerCross top={40} right={40} />
      <CornerCross bottom={40} left={40} />
      <CornerCross bottom={40} right={40} />

      {/* Editorial Header / Metadata Ticks */}
      <div
        style={{
          position: "absolute",
          top: "44px",
          left: "60px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: THEME.fonts.mono,
          fontSize: "11px",
          letterSpacing: "0.15em",
          color: THEME.colors.textMuted,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            background: THEME.colors.primaryOrange,
          }}
        />
        <span>AFTER10PM // SYS.V4</span>
        {sceneTag && (
          <>
            <span style={{ color: THEME.colors.borderMedium }}>/</span>
            <span style={{ color: THEME.colors.textPrimary }}>{sceneTag}</span>
          </>
        )}
      </div>

      {/* Timecode / Frame metadata in upper right */}
      {timecode && (
        <div
          style={{
            position: "absolute",
            top: "44px",
            right: "60px",
            fontFamily: THEME.fonts.mono,
            fontSize: "11px",
            letterSpacing: "0.2em",
            color: THEME.colors.textMuted,
          }}
        >
          {timecode}
        </div>
      )}

      {/* Bottom telemetry coordinates */}
      {!hideFooter && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: "44px",
              left: "60px",
              fontFamily: THEME.fonts.mono,
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: THEME.colors.textDim,
            }}
          >
            SPEC: 1080×1920 @ 30FPS // 9:16 VERTICAL MODULAR
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "44px",
              right: "60px",
              fontFamily: THEME.fonts.mono,
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: THEME.colors.textDim,
            }}
          >
            AFTER10PM.XYZ
          </div>
        </>
      )}
    </div>
  );
};

const CornerCross: React.FC<{
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}> = ({ top, bottom, left, right }) => (
  <div
    style={{
      position: "absolute",
      top,
      bottom,
      left,
      right,
      width: "12px",
      height: "12px",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: "5px",
        left: 0,
        width: "12px",
        height: "1px",
        background: THEME.colors.textMuted,
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "5px",
        width: "1px",
        height: "12px",
        background: THEME.colors.textMuted,
      }}
    />
  </div>
);
