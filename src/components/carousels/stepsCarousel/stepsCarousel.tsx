import React, { useEffect, useRef } from "react";
import { motion, useAnimation,useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export interface Element {
  number: number;
  title: string;
  description: string;
  inView?: boolean;
  index?: number;

}

const CircleStep = ({ number, title, description, inView, index,
 }: Element) => {
  const controls = useAnimation();

  useEffect(() => {
    if (inView && index !== undefined) {
      const timer = setTimeout(() => {
        controls.start("visible");
      }, 300 + index * 9000); // Delay of 300ms

      return () => clearTimeout(timer);
    } else {
      controls.start("hidden");
    }
  }, [inView, controls, index]);



  return (
    <>
    {/* <div className={`relative ${isLast && bigLast ? "sticky top-0 h-screen w-screen" : ""}`}> */}
  {/* Full-Screen Overlay for Last Step */}


  <div className="relative w-[100px] h-[100px] flex items-center justify-center mb-4 mx-auto">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle
        className="z-[400] w-full h-full"
        cx="50"
        cy="50"
        r="45"
        stroke="#000"
        strokeWidth="4"
        fill="none"
        strokeDasharray="282.6"
        strokeDashoffset="282.6"
      />
    </svg>

    <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
      {number}
    </div>
  </div>

  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-6 md:px-6 w-[40vw] text-center mx-auto">
    {title}
  </h3>

  <p className="text-sm sm:text-md md:text-lg text-center mt-2 max-w-[350px] mx-auto">
    {description}
  </p>
{/* </div> */}
</>
  );
};

export interface CircleStepsProps {
  steps: Element[];
  boxColor: string;
  bgColor?: string;
  title: string;
  description: string;
  textColor?: string;
  bigLast?:boolean
}

const CircleSteps = ({
  steps,
  boxColor,
  bgColor,
  title,
  description,
  textColor,
  bigLast
}: CircleStepsProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    gsap.to(track, {
      x: () => -(track.scrollWidth - container.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        pin: true,
        scrub: true,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const inView = useInView(trackRef,{
    amount: 0.2,
  });

  useEffect(() => {
    console.log("in view", inView);
  }, [inView]);

//   const variants = (delay: number) => {
//     return {
//       hidden: {
//         opacity: 0,
//         y: -40,
//       },
//       visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//           delay,
//           duration: 0.5,
//           ease: "easeOut",
//         },
//       },
//     };
//   };

  return (
    <section  key={1} className={` mt-[12rem] ${bgColor ? `${bgColor}` : ""} 
    ${textColor ? `${textColor}` : ''}
    `}>
      <h2 className="text-4xl sm:text-6xl text-center font-bold pb-6">{title}</h2>
      <p className="px-4 text-center sm:text-lg md:text-xl">{description}</p>
      <div ref={containerRef} className="relative w-screen h-[100vh] overflow-hidden z-10">
        <div
          ref={trackRef}
          key={2}
          className="flex w-max h-full items-center justify-start space-x-10 px-10
          sticky top-0"
        >
{steps.map((step, index) => {
  // Render the final step separately outside of the main div
  if (index === steps.length - 1 && bigLast) {
    return (
      <div key={index} className={`sticky h-[70vh] mr-12 top-0 w-screen flex flex-col items-center justify-center z-20 ${boxColor}`}>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-auto mt-5"
        >
          {step.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg max-w-xl text-center
          mb-auto"
        >
          {step.description}
        </motion.p>
      </div>
    );
  }

  // For other steps, render as normal
  return (
    <motion.div
      key={index}
      className={`relative z-10 ${boxColor} h-[70vh] rounded-2xl ${index === steps.length - 1 && bigLast ?  'w-screen mr-12' : ''}`}
    >
      <CircleStep {...step} index={index} inView={inView} />
    </motion.div>
  );
})}


        </div>
      </div>
    </section>
  );
};

export default CircleSteps;