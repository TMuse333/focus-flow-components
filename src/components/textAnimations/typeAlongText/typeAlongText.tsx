import { motion } from 'framer-motion';
import React, {  useState, useEffect } from 'react';

export interface TypeAlongTextProps {
  text: string; // The text to animate
//   as?: ElementType; // The HTML tag to render (default: 'p')
  styles?: string; // Additional CSS classes
  keywords?: string[]; // Highlighted keywords
  startAnimation?: boolean; // Control when animation starts
  setAnimationComplete?: React.Dispatch<React.SetStateAction<boolean>>; // Notify when animation is complete
  duration?: number; // Optional duration to control animation speed (default: 0.3 seconds)
}

const TypeAlongText = ({
    text,
    // as: Tag = "p", // Default to 'p' tag
    styles = "",
    keywords = [],
    startAnimation = false, // Default to false if not provided
    setAnimationComplete, // Optional function to notify when animation is complete
    duration = 0.3,
  }: TypeAlongTextProps): React.JSX.Element => {
  const [highlightComplete, setHighlightComplete] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);


  // Trigger animation when startAnimation is set to true
  useEffect(() => {
    if (startAnimation && !animationStarted) {
      setAnimationStarted(true);
    } else if (!startAnimation) {
      setAnimationStarted(true);
    }
  }, [startAnimation, animationStarted]);

  // Set a timeout to mark when the initial animation completes


  // Function to check if a segment is a keyword
  const isKeyword = (segment: string) => keywords.includes(segment);

  // Notify when animation is complete
  const handleAnimationComplete = () => {
    setHighlightComplete(true)
    if (setAnimationComplete) {
      setAnimationComplete(true); // Notify parent that the animation is complete
    }
  };

  // Calculate cumulative delay based on overall character position
  let charIndexCounter = 0;

  return (
    <h2 className={` ${styles}`}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex}> {/* Add spacing between words */}
          {word.split('').map((char, charIndex) => {
            const cumulativeDelay = charIndexCounter * 0.05; // Cumulative delay for each character

            charIndexCounter++; // Increment index counter for each character

            // Check if this is the last character of the entire string
            const isLastCharacter =
              charIndexCounter === text.replace(/\s/g, '').length; // Remove spaces for accurate character count

            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ y: -20, opacity: 0 }}
                animate={startAnimation && startAnimation ?{ y: 0, opacity: 1 }:
            {}}
                transition={{
                  delay: cumulativeDelay, // Cumulative delay for the character
                  duration, // Use the `duration` prop for the animation duration
                }}
                className={` ${
                  highlightComplete && isKeyword(word) ? 'animate-gradient' : ''
                }`}
                style={
                  highlightComplete && isKeyword(word)
                    ? {
                        background: 'linear-gradient(90deg, #00bfff, #00A7E0, #64D8FF)',
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
                onAnimationComplete={isLastCharacter ? handleAnimationComplete : undefined} // Call only for the last character
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h2>
  );
};

export default TypeAlongText;