import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import  TypeWriter  from "../../textAnimations/typeWriter/typeWriter"
import DiagonalClipContainer from "./diagonalClip";
import FadeInFromLeftText from "../../textAnimations/fadeInFromLeftText/fadeInFromLeftText";
import TypeAlongText from '../../textAnimations/typeAlongText/typeAlongText'

export interface FullBodyHeroProps {

    bgImage?: string;
    logoImage: string;
    fullBodyImage: string;
    titleText: string;
    typeAlongText: string;
    typeAlongKeywords: string[];
    descriptionText: string;
    altTextSkyline?: string;
    altTextLogo?: string;
    altTextFullBody?: string;
    fullBodyStyles?: string; // Optional additional class names for full body image
    logoStyles?: string;    // Optional additional class names for logo image
    typeWriterExamples?:string[]
  }
  
  const FullBodyHero = ({
    bgImage,
    logoImage,
    fullBodyImage,
    titleText,
    typeAlongText,
    typeAlongKeywords,
    descriptionText,
    altTextSkyline = "background skyline",
    altTextLogo = "logo",
    altTextFullBody = "full body portrait",
    fullBodyStyles = "",
    logoStyles = "",
    typeWriterExamples
  }: FullBodyHeroProps): React.JSX.Element => {
    const [startTypeAlong, setStartTypeAlong] = useState(false);
    const [startImage, setStartImage] = useState(false);
    const [startFadeIn, setStartFadeIn] = useState(false);
  
    const handleStartFadeIn = () => {
      setTimeout(() => {
        setStartFadeIn(true);
      }, 500);
    };
  
    return (
      <header
        className="
         md:min-h-screen relative items-center 
         mx-auto text-black
         text-white
         overflow-x-hidden
         relative z-[3]"
      >
          {bgImage && (
    <Image
    src={bgImage}
    className="w-screen h-full absolute object-cover z-[1]"
    width={600}
    height={1300}
    priority
    alt={altTextSkyline}
  />
          )}
      
        <DiagonalClipContainer />
        <section className="w-full max-w-[1500px] mx-auto">
          <section
            className="mx-auto 
            mt-auto items-center md:min-h-screen
            justify-center relative   
            flex flex-col md:flex-row
            md:mr-auto"
          >
            <section
              className="flex flex-col
              justify-center
              md:mr-auto
              max-w-[800px] 
              items-center md:items-start py-4"
            >
              <Image
              width={600}
              height={1300}
                src={logoImage}
                alt={altTextLogo}
                className={`w-[70vw] max-w-[800px] mx-auto z-[2]
                mb-[-2rem] md:mb-[-4rem] mt-[-2rem]
                md:self-start md:mr-auto md:ml-12 object-contain ${logoStyles}`}
              />
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                onAnimationComplete={() => setStartTypeAlong(true)}
                className="mx-auto 
                relative z-[2]
                md:mr-auto md:ml-6
                text-lg mt-4 font-semibold 
                text-center md:text-left"
              >
                {titleText}
              </motion.h1>
  
              <TypeAlongText
               
                styles="font-semibold
                relative z-[2]
                px-3 md:px-0 
                md:w-[50vw]
                text-5xl sm:text-6xl md:text-7xl
                mt-4 md:ml-4"
                text={typeAlongText}
                keywords={typeAlongKeywords}
                startAnimation={startTypeAlong}
                setAnimationComplete={setStartImage}
              />
  
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{
                  opacity: startImage ? 1 : 0,
                  y: startImage ? 0 : 30,
                }}
              >
                <Image
                  width={600}
                  height={1300}
                  src={fullBodyImage}
                  priority
                  alt={altTextFullBody}
                  className={`w-[70vw] md:w-[40vw] 
                  relative z-[1] md:hidden
                  translate-y-[-0rem] sm:translate-y-0
                  rounded-2xl object-contain mx-auto
                  relative z-[4] bg-transparent mt-[-3rem] md:mt-[-6.5rem]`}
                />
              </motion.div>
  
              <div className="flex flex-col flex-col-reverse md:flex-col">
                <FadeInFromLeftText
                  className="p-6 font-semibold 
                  bg-opacity-[0.4]
                  rounded-2xl 
                  md:w-[50vw] mr-auto 
                  text-xl relative z-[2]"
                  text={descriptionText}
                  startAnimation={startFadeIn}
                />
  
              {typeWriterExamples && (
                  <TypeWriter
                  examples={typeWriterExamples}
                      />
              )}
                
              </div>
            </section>
  
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 2,
                },
              }}
              onAnimationComplete={handleStartFadeIn}
              className="md:absolute md:bottom-0 md:right-[0%] 
              z-[3] mt-auto h-[80vh] w-[50vw]
              max-w-[535px] hidden md:flex
              flex flex-col justify-end"
            >
              <Image
                width={600}
                height={1300}
                priority
                src={fullBodyImage}
                alt={altTextFullBody}
                className={`${fullBodyStyles ? `${fullBodyStyles}` : ' hidden md:block md:w-[55vw] rounded-2xl max-w-[535px] object-contain mx-auto  bg-transparent h-auto relative z-[3] mt-auto '}`}
              />
            </motion.div>
          </section>
        </section>
      </header>
    );
  };
  
  export default FullBodyHero;