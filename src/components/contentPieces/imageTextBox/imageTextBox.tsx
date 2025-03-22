"use client"; // Enable client-side rendering for this component

import React, { useRef } from "react";
import Link from "next/link";
import Image from 'next/image'
import {motion, useInView} from 'framer-motion'



export interface ContentProps {
  src: string;
  alt: string;
  description: string;
  reverse?: boolean;
  title: string;
  buttonLink?: string;
  buttonText?: string;
  bgColor?:boolean;
  customImage?: React.ReactNode
  objectContain?:boolean,
  isMobile:boolean

}

const ImageTextBox: React.FC<ContentProps> = ({
  src,
  alt,
  description,
  reverse = false,
  title,
  buttonLink,
  buttonText = "Learn More",
  bgColor,
  customImage,
  objectContain,
  isMobile
}) => {


const headerRef = useRef(null)
const imgRef = useRef(null)
const pRef = useRef(null)

const headerInView = useInView(headerRef, { once: true }) ?? false;
const imgInView = useInView(imgRef, { once: true, amount: !isMobile ? 0.6 : 0.2 }) ?? false;
const pInView = useInView(pRef, { once: true }) ?? false;



// const MotionImage = motion(Image)

const fadeIn = (delay:number) => {

  return {
    initial:{
      opacity:0,
      x: reverse ? -100 : 100
    },
    animate:{
      opacity:1,
      x:0,
      transition:{
        duration:0.4,
        delay:delay
      }
    }
  }
}

const imageFadeIn = (delay:number) => {

  return {
    initial:{
      opacity:0,
      x: reverse ? 50 : -50
    },
    animate:{
      opacity:1,
      x:0,
      transition:{
        delay:delay
      }
    }
  }
}


  return (
    <>
     <motion.h2
      ref={headerRef}
      variants={fadeIn(0)}
      initial='initial'
      animate={headerInView  ? 'animate' : 'initial'}
       className=" text-center text-4xl relative z-[2] md:hidden
       font-cursive">
        {title}
      </motion.h2>
  
    <section
      className={`overflow-x-hidden flex flex-col justify-center items-center pt-8 pb-8 relative mx-auto max-w-[1200px] ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"

      } ${bgColor ? `bg-[#4D8890]` : ''}
      `}
    >
     
     {customImage ? (
      <>
      <div  ref={imgRef}>

    
      {customImage}
      </div>
      </>
     ) : (

     

<motion.div
 ref={imgRef}
 variants={imageFadeIn(isMobile ? 0 : 0.2)}
 initial="initial"
 animate={imgInView ? 'animate' : 'initial'}>


      <Image
     
      width={600}
      height={1300}
        className={`rounded-xl relative md:w-[50vw] w-[90vw] h-[80vh] md:h-[55vw] max-h-[567px]
         max-w-[668px] mx-auto ${objectContain ? 'object-contain' : 'object-cover object-[100%]'}`}
        src={src}
        alt={alt || "Image"}
      />
      </motion.div>

)}

      <div className="w-screen md:w-[45vw] pr-4 md:pr-0
      md:mb-auto md:mt-12">
        <motion.h2 
        //  ref={headerRef}
         variants={fadeIn(0)}
         initial='initial'
         animate={imgInView && !isMobile ? 'animate' : 'initial'}
        className="hidden md:block text-left pl-5 sm:pl-12 pt-5 sm:text-4xl font-semibold  text-3xl pr-3
        font-cursive">
          {title}
        </motion.h2>

        <motion.p
        ref={pRef}
         className="mt-6 pl-5 text-left sm:pl-12 pr-4"
         variants={fadeIn(isMobile ? 0 : 0.2)}
         initial="initial"
         animate={pInView ? 'animate' : 'initial'}
         >
          
          {description}
          <br/>
          {buttonLink && (
          <Link href={buttonLink}>
          <motion.button
  className="mt-6 p-3  rounded-xl text-white bg-[#338d96]
            
            hover:scale-[1.05]  transition-all "

             variants={fadeIn(isMobile ? 0 : 0.4)}
             initial="initial"
             animate={pInView ? 'animate' : 'initial'}>
              {buttonText}
            </motion.button>
          </Link>
        )}
        </motion.p>

       
      </div>
    </section>
    </>
  );
};

export default ImageTextBox;