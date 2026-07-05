"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ThemeLogoProps {
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  asset?: "loggo" | "icon";
}

export default function ThemeLogo({
  alt = "Dagens Dos logotyp",
  width = 100,
  height = 60,
  className = "",
  priority = false,
  asset = "loggo",
}: ThemeLogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Standard next-themes hydration guard; must run after mount, not derivable from render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Eftersom SSR renderar utan tema, använd standardlogotypen
  const current = mounted ? resolvedTheme || theme : "light";

  let src: string;
  if (asset === "loggo") {
    src =
      current === "dark" ? `/images/loggo-dark.png` : `/images/loggo-light.png`;
  } else {
    // asset === 'icon' -> invert colors
    src =
      current === "dark" ? `/images/icon-light.png` : `/images/icon-dark.png`;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
