import React, { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

const GOOGLE_FONTS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
`;

export const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [handle] = useState(() => delayRender("Loading Space Grotesk & JetBrains Mono"));

  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready
        .then(() => {
          continueRender(handle);
        })
        .catch(() => {
          // Fallback to continue render even if network fails
          continueRender(handle);
        });
    } else {
      continueRender(handle);
    }
  }, [handle]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GOOGLE_FONTS_CSS }} />
      {children}
    </>
  );
};
