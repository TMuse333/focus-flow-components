import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

export interface TypeAlongTextProps {
  text: string;
  styles?: string;
  keywords?: string[];
  startAnimation?: boolean;
  setAnimationComplete?: React.Dispatch<React.SetStateAction<boolean>>;
  duration?: number;
  highlightColor: string;
}

const TypeAlongText = ({
  text,
  styles = '',
  keywords = [],
  startAnimation = false,
  setAnimationComplete,
  duration = 0.3,
  highlightColor,
}: TypeAlongTextProps): React.JSX.Element => {
  const [highlightComplete, setHighlightComplete] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  // Helper functions to generate lighter and darker colors
  const hexToRgb = (hex: string): [number, number, number] => {
    const cleanedHex = hex.replace('#', '');
    const r = parseInt(cleanedHex.substring(0, 2), 16);
    const g = parseInt(cleanedHex.substring(2, 4), 16);
    const b = parseInt(cleanedHex.substring(4, 6), 16);
    return [r, g, b];
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number) => {
      const hex = Math.max(0, Math.min(255, n)).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const adjustColor = (hex: string, factor: number): string => {
    const [r, g, b] = hexToRgb(hex);
    const adjustedR = Math.round(r * factor);
    const adjustedG = Math.round(g * factor);
    const adjustedB = Math.round(b * factor);
    return rgbToHex(adjustedR, adjustedG, adjustedB);
  };

  // Generate lighter and darker shades
  const lighterColor = adjustColor(highlightColor, 1.2); // 20% lighter
  const darkerColor = adjustColor(highlightColor, 0.8); // 20% darker

  // Trigger animation when startAnimation is set to true
  useEffect(() => {
    if (startAnimation && !animationStarted) {
      setAnimationStarted(true);
    } else if (!startAnimation) {
      setAnimationStarted(true);
    }
  }, [startAnimation, animationStarted]);

  // Function to check if a segment is a keyword
  const isKeyword = (segment: string) => keywords.includes(segment);

  // Notify when animation is complete
  const handleAnimationComplete = () => {
    setHighlightComplete(true);
    if (setAnimationComplete) {
      setAnimationComplete(true);
    }
  };

  // Calculate cumulative delay based on overall character position
  let charIndexCounter = 0;

  return (
    <h2 className={`${styles}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex}>
          {word.split('').map((char, charIndex) => {
            const cumulativeDelay = charIndexCounter * 0.05;
            charIndexCounter++;

            const isLastCharacter = charIndexCounter === text.replace(/\s/g, '').length;

            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ y: -20, opacity: 0 }}
                animate={startAnimation ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: cumulativeDelay,
                  duration,
                }}
                className={`${highlightComplete && isKeyword(word) ? 'animate-gradient' : ''}`}
                style={
                  highlightComplete && isKeyword(word)
                    ? {
                        background: `linear-gradient(90deg, ${highlightColor}, ${darkerColor}, ${lighterColor})`,
                        backgroundSize: '200% 200%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        animation: 'gradient-animation 8s ease-in-out infinite',
                        transition: 'background 0.5s ease, color 0.5s ease',
                      }
                    : undefined
                }
                whileHover={{
                  y: -12,
                  transition: {
                    duration: 0.2,
                    ease: 'easeInOut',
                  },
                }}
                exit={{
                  y: 0,
                  transition: {
                    duration: 0.01,
                    ease: 'easeInOut',
                  },
                }}
                onAnimationComplete={isLastCharacter ? handleAnimationComplete : undefined}
              >
                {char}
              </motion.span>
            );
          })}
          <span> </span>
        </span>
      ))}
    </h2>
  );
};

export default TypeAlongText;