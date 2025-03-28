import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { useEffect } from "react";

// Slight variations of #00bfff for a subtle aurora effect
const COLORS_AURORA = [
    "#00bfff", // Light blue (Original)
    "#0099cc", // Slightly darker blue
    "#0077b3", // Mid-tone blue
    "#005f8a", // Darker blue
    "#004f6b", // Even darker blue
  ];
  

const DiagonalClipContainer = () => {
  const color = useMotionValue(COLORS_AURORA[0]);

  useEffect(() => {
    animate(color, COLORS_AURORA, {
      ease: "easeInOut",
      duration: 8, // Smooth transition time
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const background = useMotionTemplate`linear-gradient(to bottom, #2EC9FF, ${color})`;

  return (
    <div className="hidden md:block absolute w-full h-full z-[1]">
      {/* First Polygon */}
      <motion.div
        className="absolute w-full h-full z-[1]
        sm:clip-path-[polygon(100%_0,_0_100%,_100%_100%)] md:clip-path-[polygon(100%_0,_99%_50%,_100%_100%)]"
        style={{
          background,
        }}
        initial={{
          clipPath: "polygon(100% 0, 99% 50%, 100% 100%)", // Start as a thin vertical line
        }}
        animate={{
          clipPath: "polygon(100% 0, 49% 100%, 100% 100%)", // Expand to full shape
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        // For mobile: Apply larger polygon, for md and above: apply the original polygon

      />

      {/* Second Polygon (Opposite Corner) */}
      <motion.div
        className="absolute w-full h-full z-[1]
        sm:clip-path-[polygon(55%_0,_0_0,_0_38%)] md:clip-path-[polygon(55%_0,_0_0,_0_38%)]"
        style={{
          background,
        }}
        initial={{
          clipPath: "polygon(38% 0, 0 0, 0 38%)", // Start as a thin line
        }}
        animate={{
          clipPath: "polygon(13% 0, 0 0, 0 23%)", // Same animation for the second polygon
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
        // For mobile: Apply larger polygon, for md and above: apply the original polygon
     
      />
    </div>
  );
};

export default DiagonalClipContainer;