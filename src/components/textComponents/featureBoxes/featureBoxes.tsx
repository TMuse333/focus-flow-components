import Image from "next/image";
import React, {useRef} from "react";
import SlidingText from "../../textAnimations/slidingText/slidingText"
import {useInView, motion} from 'framer-motion'

interface BoxProps {
    src:string,
    alt:string,
    title:string,
    description:string
    boxColor:string

}

export interface FeatureBoxProps {
    title?:string,
    description?:string,
    boxData:{
        src:string,
    alt:string,
    title:string,
    description:string

    }[]
    boxColor:string,
    bgColor?:string,
    titleSlideColor?:string
}


const FeatureBox: React.FC<BoxProps> = ({
    src,
    alt,
    title,
    description,
    boxColor,
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 1 });
  
    const containerVariants = {
      hidden: { y: -50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 1,
        },
      },
    };
  
    const childVariants = {
      hidden: { y: -20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
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
        className={`w-[90vw] mx-auto p-4 mb-8 border border-black rounded-xl sm:w-[40vw] ${boxColor} max-w-[550px]`}
      >
       <motion.div
        variants={childVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ ...childVariants.visible.transition, delay: 0.1 }}
        className="w-[30px] sm:w-[35px] md:h-[40px] mx-auto mb-4"
      >
        <Image src={src} alt={alt} width={600} height={1300} className="object-contain" />
      </motion.div>
  
        <motion.h3
          className="text-lg  font-semibold"
          variants={childVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...childVariants.visible.transition, delay: 0.2 }}
        >
          {title}
        </motion.h3>
  
        <motion.p
          variants={childVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...childVariants.visible.transition, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </motion.div>
    );
  };
  


const FeatureBoxes = ({
    boxData, title, description,
    boxColor, bgColor,titleSlideColor

}:FeatureBoxProps):React.JSX.Element => {


    return (
        <section className={` w-screen
        ${bgColor ? `${bgColor}` : ''}`}>
        {/* <AppearingGradient
  text={title}
  subText={description}
  

/> */}

{title && description && (
    <SlidingText
text={title}
styles="text-center mx-auto text-4xl
sm:text-5xl md:text-6xl mb-4
text-black "
subText={description}
slideColor={titleSlideColor ? titleSlideColor : ''}
/>
)}





        <section className="flex flex-col mx-auto
        justify-center items-center mt-6
        sm:grid grid-cols-2 max-w-[1200px]

        ">

            {boxData.map((box, index) => (
                <FeatureBox
                {...box}
                key={index}
                boxColor={boxColor}
                />

            ))}

</section>
        </section>
    )
}

export default FeatureBoxes