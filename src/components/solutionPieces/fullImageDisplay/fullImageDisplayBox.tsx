import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion,
useInView } from "framer-motion";

// Define the type for the InteractiveBox component props
interface InteractiveBoxProps {
  src: string;
  alt: string;
  description: string;
  button: string;

  destination:string,
  stats:string[]

}

// const realEstateStats = [
//     { label: 'Price', value: '$500k' },
//     { label: 'Date Built', value: '1995' },
//     { label: 'Bathrooms', value: '3' },
//     { label: 'Bedrooms', value: '4' }
//   ];
  

// InteractiveBox component
const InteractiveBox: React.FC<InteractiveBoxProps> = ({
    src,
    alt,
    description,
    stats
  }) => {
    const ref = useRef(null);

  
  
    const inView = useInView(ref, {
      once: true,
      amount: 0.6,
    });
  
const variants = {
  initial:{
    opacity:0,
    y:-30
  },
  animate:{
    opacity:1,
    y:0
  }
}
  
    const [isHovered, setIsHovered] = useState(false);



    const getAnimationProps = (index: number, inView: boolean) => {
      return {
        animate: inView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: 20, x: -10 },
        transition: {
          duration: 0.3,
          delay: 0.4 + index * 0.2, // Staggered delay for each item based on index
        },
      };
    };
    
  
    return (
        <>
    

        
      <motion.div
      variants={variants}
      animate={inView ? 'animate' : 'initial'}
        className={`relative w-[95vw] sm:w-[45vw] mx-auto mb-4  h-[60vh] rounded-3xl overflow-hidden 
        mb-[4rem] border h-[90vh] sm:max-h-[600px] max-w-[620px]`}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          className={`w-full h-full transition-all
           
           ${isHovered ? 'scale-[1.2]' : 'scale-[1]'}`}
          src={src}
          alt={alt}
          width={600}
          height={1300}
        />

    <>
  
   <button
   className="mt-2 bg-white text-black px-4 py-2 absolute top-0 right-[10%] rounded-full w-[50px] h-[45px] hover:bg-gray-300 transition-all transform hover:rotate-45"
  >
^
  </button>
</>


        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-white text-lg font-semibold pb-3">
      
 <motion.p
   
  // Animation when entering
      animate={inView ?{ opacity: 1, y: 0 } : { opacity: 0, y: 10 }} // Animation when in view
    // Animation when exiting
      transition={{ duration: 0.3, delay:0.4 }} // Controls smoothness
   
    >
      {description}
    </motion.p>
<ul className="flex flex-row w-full justify-around mt-4">
      {stats.map((stat, index) => (
        <motion.li
          key={index}
           // Starting position with some offset from left
           initial={{ opacity: 0, y: 20, x: -10 }} // Optional initial state
           {...getAnimationProps(index, inView)}
        >
          {stat}
        </motion.li>
      ))}
    </ul>

          </h3>
        
        </div>
        </motion.div>
       
     
    
      </>
    );
  };

// Define the type for the InteractiveBoxes component props
interface FullImageDisplayProps {
  boxes: InteractiveBoxProps[];
  bgColor?:string
}

// InteractiveBoxes component
const FullImageDisplay = ({ boxes,bgColor }:FullImageDisplayProps):React.JSX.Element => {
  return (
    <section className={`w-screen ${bgColor? `${bgColor}` : ''}`}>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-0
    w-[95vw] mx-auto rounded-2xl max-w-[1600px] 
    py-6 px-1 mb-8">
      {boxes.map((box, index) => (
        <InteractiveBox
         {...box}
         key={index}
        
        />
      ))}
    </div>
    </section>
  );
};

export default FullImageDisplay;