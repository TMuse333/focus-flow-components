import FadeInFromLeftText from "../../textAnimations/fadeInFromLeftText/fadeInFromLeftText";
import Image from "next/image";
import React, {useState} from "react";
import { motion } from "framer-motion";

export interface ImageLogoHeroProps {
  heroImage: string;
  logoImage: string;
  headingText: string;
  subHeadingText: string;
  button1?: React.ReactNode;
  button2?: React.ReactNode;
  description: string;
  logoAlt:string,
  heroAlt:string,
  bgColor?:string,
  objectContain?:boolean
}

const ImageLogoHero = ({
  heroImage,
  logoImage,
  headingText,
  subHeadingText,
  button1,
  button2,
  description,
  logoAlt,
  heroAlt,
  bgColor,
  objectContain
}: ImageLogoHeroProps): React.JSX.Element => {

  const [startFade, setStartFade] = useState(false)
  return (



    <header
      className={`flex flex-col md:flex-row md:h-screen relative items-center 
      mx-auto max-w-[1500px]  md:mt-[-4rem] z-[2]
      ${bgColor ? `${bgColor}` : ''}`}
    >
      {/* Left Section */}
      <section className="flex flex-col md:w-[50vw] justify-center items-center py-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.6 }} 
          className="mx-auto p-3 text-center text-lg mt-4 font-semibold"
        >
          {subHeadingText}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Image
            src={logoImage}
            height={600}
            width={1300}
            alt={logoAlt}
            className="w-[80vw] h-[20vh] object-contain mx-auto md:w-[45vw]"
          />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7, duration: 0.6 }} 
          className="font-semibold text-5xl sm:text-6xl md:text-7xl mt-4 text-center md:text-start md:pl-6"
        >
          {headingText}
        </motion.h2>

        {/* FadeInFromLeftText starts after image animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 1.0, duration: 0.6 }} 
          className="mx-auto md:mr-auto md:ml-0 md:pl-6 mt-4"
          onAnimationComplete={()=>setStartFade(true)}
        >
          <FadeInFromLeftText text={description} startAnimation={startFade}
           className="mx-auto md:mr-auto md:ml-0 md:pl-6 mt-4"
           />
        </motion.div>

        {/* Buttons */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.2, duration: 0.6 }} 
          className="flex mr-auto ml-6"
        >
          {button1 && <div className="mr-6">{button1}</div>}
          {button2 && <div className="mr-6">{button2}</div>}
        </motion.section>
      </section>

      {/* Right Image with Motion Wrapper */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-[98vw] md:w-[48vw] rounded-2xl object-cover mx-auto md:block h-[80vh] mt-auto mb-auto"
      >
        <Image
          src={heroImage}
          height={600}
          width={1300}
          alt={heroAlt}
          className={`w-full h-full rounded-2xl object-cover
          ${objectContain ? 'object-contain' : 'object-cover'}`}
        />
      </motion.div>
    </header>
  );
};

export default ImageLogoHero;
