import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform,useMotionValueEvent } from "framer-motion";

export interface SlidingTextProps {
    text: string;
    setSlideComplete?: React.Dispatch<React.SetStateAction<boolean>>;
    subText?: string;
    reverse?:boolean
    styles?:string,
    slideColor?:string,
    xPercent?:number
}

const SlidingText = ({ text, setSlideComplete, subText,
styles,reverse,slideColor,xPercent }:SlidingTextProps ): React.JSX.Element => {
    // Reference to the target element to track scroll position
    const targetRef = useRef(null);

    // State to track when slide is complete
    const [slideComplete, setLocalSlideComplete] = useState(false);

    // Get scroll progress relative to the targetRef
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"], // Adjust these offsets as needed
    });

    // Transform scroll progress to x position, scale, opacity, and tilt effect
    const x = useTransform(scrollYProgress, [0,xPercent ? xPercent : 0.7], [!reverse ? 350 : -350, 0]); // Adjust slide-in distance
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.55], [0, 0, 1]);

    // Add drag/tilt effect (rotate on both X and Y axis based on scroll progress)
    const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]); // Tilt effect (rotation along X axis)
    const rotateY = useTransform(scrollYProgress, [0, 1], [5, -5]); // Tilt effect (rotation along Y axis)

    // Monitor changes in the `x` value and set `slideComplete` to true when x reaches 0
    useMotionValueEvent(x, "change", (latestX) => {
        if (latestX === 0 && !slideComplete) {
          setLocalSlideComplete(true);
          console.warn("slide complete");
          if (setSlideComplete) setSlideComplete(true);
        }
      });

    return (
        <div ref={targetRef}>
            <motion.h2
                className={`${styles} ${slideComplete && slideColor ? `${slideColor}` : ''}`}
                style={!slideComplete ? { x, opacity, rotateX, rotateY } : {}} // Apply the animated styles with tilt
                // Apply the gradient flow when slideComplete is true
             
            >
                {text}
            </motion.h2>
            {subText && (
                <motion.h3
                animate={slideComplete ? {opacity:1, y:0} : {opacity:0,y:-30}}
                    id={`subtext-${subText}`}
                    className={`
                    mt-4 text-center  text-xl sm:text-2xl
                    md:text-3xl
                    
                    px-4`}
                >
                    {subText}
                </motion.h3>
            )}
        </div>
    );
};

export default SlidingText;