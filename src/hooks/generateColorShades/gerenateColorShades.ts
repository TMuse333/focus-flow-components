// ../../../hooks/generateColorShades/generateColorShades.ts

import { useState, useEffect } from 'react';

// Hook to generate color shades based on a main color
function useGenerateColorShades(mainColor: string): string[] {
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    // Helper function to adjust lightness of a color
    const adjustColor = (color: string, factor: number): string => {
      const rgb = parseInt(color.slice(1), 16); // Convert hex to RGB
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      const adjust = (value: number, factor: number) => Math.min(255, Math.max(0, value + factor));

      const newR = adjust(r, factor);
      const newG = adjust(g, factor);
      const newB = adjust(b, factor);

      // Convert RGB back to hex
      const hex = (1 << 24) | (newR << 16) | (newG << 8) | (newB << 0);
      return `#${hex.toString(16).slice(1).toUpperCase()}`;
    };

    // Generate 4 other colors based on mainColor
    const generatedColors = [
      mainColor, // Base color
      adjustColor(mainColor, -20), // Slightly darker
      adjustColor(mainColor, -40), // Mid-tone darker
      adjustColor(mainColor, -60), // Darker
      adjustColor(mainColor, -80), // Even darker
    ];

    setColors(generatedColors);
  }, [mainColor]);

  return colors;
}

export default useGenerateColorShades;
