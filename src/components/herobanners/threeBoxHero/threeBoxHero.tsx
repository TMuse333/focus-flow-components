"use client"; // Enable client-side rendering for this component

import React, { useMemo, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

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
  textColor?: string;
  boxTextColor?: string;
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
  button2,
  textColor,
  boxTextColor,
}: ThreeBoxHeroProps): React.JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const backgroundStyle = useMemo(
    () =>
      gradient
        ? { background: `radial-gradient(circle, ${gradient.color1} -15%, ${gradient.color2} 100%)` }
        : {},
    [gradient]
  );

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        bounce: 0.4,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
      },
    },
  };

  const boxVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        delay: i * 0.8,
      },
    }),
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: {
        type: "spring" as const,
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
          className={`border border-gray-200 rounded-xl w-[75vw] md:w-[30vw] max-w-[500px] mx-auto py-4 mb-8 md:mr-3 ${boxBgColor} ${
            boxTextColor ? boxTextColor : ''
          }`}
        >
          <h2 className={`text-left ml-8 text-xl ${boxTextColor ? boxTextColor : ''}`}>
            {box.title}
          </h2>
          <p className={`ml-8 text-left mt-4 ${boxTextColor ? boxTextColor : ''}`}>
            {box.description}
          </p>
        </motion.div>
      )),
    [boxData, boxBgColor, boxTextColor, isInView]
  );

  return (
    <motion.section
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`w-screen md:h-screen flex justify-center items-center flex-col ${bgColor ? bgColor : ""} ${
        textColor ? textColor : ''
      }`}
      style={backgroundStyle}
    >
      <motion.h1
        variants={textVariants}
        className="text-sm px-4 sm:text-md mb-4 mt-8 md:text-lg font-semibold text-center"
      >
        {h1}
      </motion.h1>
      <motion.h2
        variants={textVariants}
        className="text-4xl px-4 mb-4 mt-3 sm:text-5xl md:text-6xl font-semibold text-center"
      >
        {h2}
      </motion.h2>
      <motion.p
        variants={textVariants}
        className="w-[80%] mx-auto text-center"
      >
        {pTag}
      </motion.p>

      <motion.section
        variants={containerVariants}
        className="mt-4 flex justify-center items-center"
      >
        {button1 && <>{button1}</>}
        {button2 && <>{button2}</>}
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