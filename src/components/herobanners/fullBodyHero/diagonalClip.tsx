import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";
import { useEffect } from "react";
import useGenerateColorShades from '../../../hooks/generateColorShades/gerenateColorShades'; // Import the hook

interface DiagonalClipContainerProps {
    mainColor: string; // Prop for the main color
  }
  
  const DiagonalClipContainer = ({ mainColor }: DiagonalClipContainerProps): React.JSX.Element => {
  const colors = useGenerateColorShades(mainColor); // Get the generated colors based on the main color

  console.log('colors generated',colors)
  
  const color = useMotionValue(colors[0]); // Use the first generated color for the animation

  useEffect(() => {
    animate(color, colors, {
      ease: "easeInOut",
      duration: 8, // Smooth transition time
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [colors, color]);

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
      />
    </div>
  );
};

export default DiagonalClipContainer;
