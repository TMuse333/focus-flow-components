"use client"; // Enable client-side rendering for this component

import Image from "next/image";
import React, { useRef } from "react";
import SlidingText from "../../textAnimations/slidingText/slidingText";
import { useInView, motion, Variants } from "framer-motion";

interface BoxProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  boxColor: string;
  boxTextColor?: string;
}

export interface FeatureBoxProps {
  title?: string;
  description?: string;
  boxData: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
  boxColor: string;
  bgColor?: string;
  titleSlideColor?: string;
  textColor?: string;
  boxTextColor: string;
}

const FeatureBox: React.FC<BoxProps> = ({
  src,
  alt,
  title,
  description,
  boxColor,
  boxTextColor,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 1 });

  const containerVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 7,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`w-[90vw] mx-auto p-4 mb-8 border border-black rounded-xl sm:w-[40vw] ${boxColor} max-w-[550px] ${
        boxTextColor ? boxTextColor : ''
      }`}
    >
      <motion.div
        variants={childVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ type: "spring" as const, stiffness: 500, damping: 7, delay: 0.1 }}
        className="w-[30px] sm:w-[35px] md:h-[40px] mx-auto mb-4"
      >
        <Image src={src} alt={alt} width={600} height={1300} className="object-contain" />
      </motion.div>

      <motion.h3
        className={`text-lg font-semibold ${boxTextColor ? boxTextColor : ''}`}
        variants={childVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ type: "spring" as const, stiffness: 500, damping: 7, delay: 0.2 }}
      >
        {title}
      </motion.h3>

      <motion.p
        variants={childVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ type: "spring" as const, stiffness: 500, damping: 7, delay: 0.3 }}
        className={boxTextColor ? boxTextColor : ''}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

const FeatureBoxes = ({
  boxData,
  title,
  description,
  boxColor,
  bgColor,
  titleSlideColor,
  boxTextColor,
  textColor,
}: FeatureBoxProps): React.JSX.Element => {
  return (
    <section className={`w-screen ${bgColor ? bgColor : ''} ${textColor ? textColor : ''}`}>
      {title && description && (
        <SlidingText
          text={title}
          styles={`text-center mx-auto text-4xl sm:text-5xl md:text-6xl mb-4 
          ${textColor ? textColor : ''} `}
          subText={description}
          slideColor={titleSlideColor ? titleSlideColor : ''}
        />
      )}

      <section className="flex flex-col mx-auto justify-center items-center mt-6 sm:grid grid-cols-2 max-w-[1200px]">
        {boxData.map((box, index) => (
          <FeatureBox
            {...box}
            key={index}
            boxColor={boxColor}
            boxTextColor={boxTextColor}
          />
        ))}
      </section>
    </section>
  );
};

export default FeatureBoxes;