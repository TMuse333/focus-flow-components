"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, animate, useInView } from "framer-motion";
import { easeIn } from "framer-motion/dom";

export interface ExperienceCardProps {
  title: string;
  src: string;
  alt: string;
  description: string;
  aspects: string[];
  link: string;
  buttonText: string;
  reverse?: boolean;
  aspectHeader: string;
  bgColor?: string;
  buttonColor?: string;
  hoverTextColor?: string;
  objectContain?: boolean;
}

const ExperienceCard = ({
  title,
  src,
  alt,
  description,
  aspects,
  link,
  reverse,
  aspectHeader,
  buttonText,
  bgColor,
  buttonColor,
  hoverTextColor,
  objectContain,
}: ExperienceCardProps): React.JSX.Element => {
  const [startAnimation, setStartAnimation] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 1, 1, 0.7], { ease: easeIn });

  useMotionValueEvent(scale, "change", (latestScale) => {
    if (latestScale === 1) {
      console.warn("Scale reached 1");
      setStartAnimation(true);
    }
  });

  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);

  const [startLiAnimation, setStartLiAnimation] = useState(false);

  const handleAnimation = async () => {
    const header = headerRef.current;
    const image = imageRef.current;
    const description = descriptionRef.current;

    if (image && description) {
      animate(header, { opacity: 1 }, { ease: "easeInOut", delay: 0.0 });
      animate(image, { opacity: 1 }, { ease: "easeInOut", delay: 0.2 });
      animate(description, { opacity: 1 }, { ease: "easeInOut", delay: 0.4 });
    }
    setStartLiAnimation(true); // Always animate list items when animation starts
  };

  useEffect(() => {
    if (startAnimation) {
      handleAnimation();
    }
  }, [startAnimation]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 865);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize(); // Initial check
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const liRef = useRef(null);
  const skillsInView = useInView(liRef, { amount: 0.6 });

  useEffect(() => {
    if (skillsInView) {
      setStartLiAnimation(true);
    }
  }, [skillsInView]);

  const liVariants = useCallback(
    (delay: number, index: number) => ({
      initial: {
        opacity: 0,
        x: isMobile && index % 2 === 0 ? -20 : 20,
        y: !isMobile ? 20 : 0,
      },
      animate: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { delay: 0.3 + delay },
      },
    }),
    [isMobile]
  );

  const jsxContent = (
    <motion.section
      ref={ref}
      style={{ scale }}
      className={`relative mx-auto w-[98vw] rounded-2xl my-8 max-w-[1200px] overflow-x-hidden ${bgColor ? bgColor : ""}`}
    >
      <h2
        ref={headerRef}
        id={`${title}-header`}
        className="text-center w-full text-3xl sm:text-4xl mb-6 font-bold pt-4 px-3 opacity-0"
      >
        {title}
      </h2>
      <section className={`flex flex-col md:px-4 mx-auto ${reverse ? "md:flex-row-reverse" : "md:flex-row"}`}>
        <Image
          ref={imageRef}
          id={`${title}-image`}
          src={src}
          alt={alt}
          width={600}
          height={1300}
          className={`w-[80vw] opacity-0 mx-auto mb-4 sm:w-[40vw] max-w-[500px] rounded-2xl max-h-[400px] ${
            objectContain ? "object-contain" : "object-cover"
          }`}
        //   sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 500px"
        //   priority={true}
        />
        <p
          ref={descriptionRef}
          id={`${title}-description`}
          className="px-4 font-semibold opacity-0 my-auto md:w-[40vw] md:text-lg whitespace-pre-line"
        >
          {description}
          <br />
          {link !== "" && (
            <button
              className={`${buttonColor ? buttonColor : ""} p-2 rounded-2xl mt-3 transition-all hover:scale-[1.1] ${
                hoverTextColor ? `hover:text-[${hoverTextColor}]` : ""
              }`}
            >
              <Link href={link}>{buttonText}</Link>
            </button>
          )}
        </p>
      </section>
      <section className="w-full">
        <h3 className="text-center my-6 text-3xl font-semibold px-4">{aspectHeader}</h3>
        <ul
          ref={liRef}
          className="mx-auto font-semibold mt-4 md:grid md:grid-cols-3 md:px-4 pb-8 w-full justify-around"
        >
          {aspects.map((aspect, index) => (
            <motion.li
              className={`mb-4 w-[90%] max-w-[250px] mx-auto p-3 ${
                buttonColor ? buttonColor : ""
              } rounded-2xl flex justify-center items-center text-center md:w-full md:mr-4`}
              key={index}
              variants={liVariants(isMobile ? index * 0.2 : index * 0.1, index)}
              initial="initial"
              animate={startLiAnimation ? "animate" : "initial"}
            >
              {aspect}
            </motion.li>
          ))}
        </ul>
      </section>
    </motion.section>
  );

  return jsxContent;
};

export default ExperienceCard;