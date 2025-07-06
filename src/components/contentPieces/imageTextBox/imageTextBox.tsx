"use client"; // Enable client-side rendering for this component

import React, { useRef } from "react";
import Image from 'next/image';
import { motion, useInView, Variants } from 'framer-motion';

export interface ImageTextBoxProps {
  src: string;
  alt: string;
  description: string;
  reverse?: boolean;
  title: string;
  bgColor?: string;
  customImage?: React.ReactNode;
  objectContain?: boolean;
  isMobile: boolean;
  button?: React.ReactNode;
  textColor?: string;
}

const ImageTextBox = ({
  src,
  alt,
  description,
  reverse = false,
  title,
  bgColor,
  customImage,
  objectContain,
  isMobile,
  button,
  textColor,
}: ImageTextBoxProps): React.JSX.Element => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const headerInView = useInView(headerRef, { once: true });
  const imgInView = useInView(imgRef, { once: true, amount: isMobile ? 0.2 : 0.6 });
  const pInView = useInView(pRef, { once: true });

  const fadeIn = (delay: number): Variants => ({
    initial: {
      opacity: 0,
      x: reverse ? -100 : 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay,
        ease: "easeInOut" as const,
      },
    },
  });

  const imageFadeIn = (delay: number): Variants => ({
    initial: {
      opacity: 0,
      x: reverse ? 50 : -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        delay,
        ease: "easeInOut" as const,
      },
    },
  });

  return (
    <>
      <motion.h2
        ref={headerRef}
        variants={fadeIn(0)}
        initial="initial"
        animate={headerInView ? "animate" : "initial"}
        className={`text-center text-4xl relative z-[2] md:hidden font-cursive ${textColor ? textColor : ''}`}
      >
        {title}
      </motion.h2>

      <section
        className={`overflow-x-hidden flex flex-col justify-center items-center pt-8 pb-8 relative mx-auto max-w-[1200px] ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } ${bgColor ? bgColor : ''} ${textColor ? textColor : ''}`}
      >
        {customImage ? (
          <div ref={imgRef}>{customImage}</div>
        ) : (
          <motion.div
            ref={imgRef}
            variants={imageFadeIn(isMobile ? 0 : 0.2)}
            initial="initial"
            animate={imgInView ? "animate" : "initial"}
          >
            <Image
              width={600}
              height={1300}
              className={`rounded-xl relative md:w-[50vw] w-[90vw] h-[80vh] md:h-[55vw] max-h-[567px] max-w-[668px] mx-auto ${
                objectContain ? 'object-contain' : 'object-cover object-[100%]'
              }`}
              src={src}
              alt={alt || "Image"}
            />
          </motion.div>
        )}

        <div className="w-screen md:w-[45vw] pr-4 md:pr-0 md:mb-auto md:mt-12">
          <motion.h2
            variants={fadeIn(0)}
            initial="initial"
            animate={imgInView && !isMobile ? "animate" : "initial"}
            className="hidden md:block text-left pl-5 sm:pl-12 pt-5 sm:text-4xl font-semibold text-3xl pr-3 font-cursive"
          >
            {title}
          </motion.h2>

          <motion.p
            ref={pRef}
            className="mt-6 pl-5 text-left sm:pl-12 pr-4"
            variants={fadeIn(isMobile ? 0 : 0.2)}
            initial="initial"
            animate={pInView ? "animate" : "initial"}
          >
            {description}
            <br />
            {button && <>{button}</>}
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default ImageTextBox;