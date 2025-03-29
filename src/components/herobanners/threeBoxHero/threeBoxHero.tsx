import Link from "next/link";
import React, { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface ThreeBoxHeroProps {
  h1: string;

  h2: string;
  pTag: string;
  boxData: {
    title: string;
    description: string;
  }[];

  gradient?: {
    color1: string;
    color2: string;
  };
  bgColor?: string;
  boxBgColor: string;
  button1?: React.ReactNode;
  button2?: React.ReactNode;
}

const ThreeBoxHero = ({
  h1,

  h2,
  pTag,
  boxData,
  bgColor,
  gradient,
  boxBgColor,
  button1,
  button2
}: ThreeBoxHeroProps): React.JSX.Element => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const backgroundStyle = useMemo(
    () =>
      gradient
        ? { background: `radial-gradient(circle, ${gradient.color1} -15%, ${gradient.color2} 100%)` }
        : {},
    [gradient]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: i * 0.8, // Increased delay for clearer sequential effect
      },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  const renderBoxes = useMemo(
    () =>
      boxData.map((box, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={boxVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          className={`border border-gray-200 rounded-xl w-[75vw] mx-auto py-4 mb-8 md:mr-3 ${boxBgColor}`}
        >
          <h2 className="text-left ml-8 text-xl font-semibold bg-gradient-to-b from-gray-300 to-gray-200 bg-clip-text text-transparent">
            {box.title}
          </h2>
          <p className="ml-8 text-left mt-4 text-gray-300">{box.description}</p>
        </motion.div>
      )),
    [boxData, boxBgColor, isInView]
  );

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`w-screen md:h-screen flex justify-center items-center flex-col ${bgColor ? bgColor : ""}`}
      style={backgroundStyle}
    >
      <motion.h1
        variants={textVariants}
        className="text-sm px-4 sm:text-md mb-4 mt-8 sm:text-md md:text-lg font-semibold text-center mb-4 animate-gradient"
      >
        {h1}
      </motion.h1>
      <motion.h2
        variants={textVariants}
        className="text-4xl px-4 mb-4 mt-3 sm:text-5xl md:text-6xl font-semibold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent text-center"
      >
        {h2}
      </motion.h2>
      <motion.p
        variants={textVariants}
        className=" w-[80%] mx-auto text-center"
      >
        {pTag}
      </motion.p>

      <motion.section
        variants={containerVariants}
        className="mt-4 flex justify-center items-center"
      >
       {button1 && (
        <>
        {button1}
        </>
       )}
         {button2 && (
        <>
        {button2}
        </>
       )}

      </motion.section>

      <motion.section
        variants={containerVariants}
        className="flex flex-col md:flex-row md:w-[90%] mx-auto mt-12 md:justify-evenly"
      >
        {renderBoxes}
      </motion.section>
    </motion.section>
  );
};

export default ThreeBoxHero;