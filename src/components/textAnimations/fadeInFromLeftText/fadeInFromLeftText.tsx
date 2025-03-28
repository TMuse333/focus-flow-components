import { motion } from 'framer-motion';
import React, {  useState, useEffect } from 'react';
// import type { ElementType } from "react";
export interface FadeInFromLeftTextProps {
  text: string; // The text to animate

  className?: string; // Additional CSS classes
  duration?: number; // Total animation duration (in seconds)
  startAnimation?: boolean; // Control when animation starts
  setAnimationComplete?: React.Dispatch<React.SetStateAction<boolean>>; // Notify when animation is complete
  keywords?: string[]; // Highlighted keywords
}

const FadeInFromLeftText = ({
    text,
    // Default to 'p' tag
    className = '',
    duration = 2, // Default animation duration
    startAnimation, // Default to false if not provided
    setAnimationComplete, // Optional function to notify when animation is complete
    keywords = [], // Default to an empty array if not provided
  }: FadeInFromLeftTextProps): React.JSX.Element => {

  const [animationStarted, setAnimationStarted] = useState(false);

  // Trigger animation when startAnimation is set to true
  useEffect(() => {
    if (startAnimation && !animationStarted) {
      setAnimationStarted(true);
    } else if (!startAnimation) {
      setAnimationStarted(true);
    }
  }, [startAnimation, animationStarted]);

  // Notify when animation is complete
  useEffect(() => {
    if (animationStarted && setAnimationComplete) {
      const timeout = setTimeout(() => {
        setAnimationComplete(true); // Notify parent when animation is complete
      }, duration * 1000); // Use duration to calculate when the animation finishes
      return () => clearTimeout(timeout); // Cleanup timeout
    }
  }, [animationStarted, duration, setAnimationComplete]);

  // Function to check if a word is a keyword
  const isKeyword = (word: string) => keywords.includes(word);

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
      animate={startAnimation ? { clipPath: 'inset(0 0% 0 0)', opacity: 1 } : {}}
      transition={{ duration }}
      className={`overflow-hidden ${className}`} // Ensure no overflow
    >
      <p>
        {text.split(' ').map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: wordIndex * 0.1, // Delay based on word position
              duration: 0.5, // Animation duration
            }}
            className={isKeyword(word) ? 'animate-gradient font-bold' : ''} // Apply specific class if keyword
            style={
                isKeyword(word)
                  ? {
                      background: 'linear-gradient(90deg, #00A4F6, #66C8FF, #00A4F6)',
                      backgroundSize: '200% 200%',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      animation: 'gradient-animation 8s ease-in-out infinite',
                      transition: 'background 0.5s ease, color 0.5s ease',
                    }
                  : undefined
              }
          >
            {word}
            &nbsp; {/* Adding space between words */}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
};

export default FadeInFromLeftText;