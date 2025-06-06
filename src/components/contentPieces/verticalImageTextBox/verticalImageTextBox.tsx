import React, { useEffect } from "react";
import { useAnimate, motion, useMotionValue, useMotionTemplate,
useInView, animate } from 'framer-motion';
import Image from "next/image";


import AppearingGradient from '../../textAnimations/appearingGradient/appearingGradient'



export interface VerticalImageTextBoxProps {
    title: string;
    description: string;
    logo?: string;
    bgImage?: string;
    isMobile: boolean;
    subTitle?:string
    button?: React.ReactNode,
    mainGradientColor:string,
    darkGradientColor:string,
    brightGradientColor:string

  }
  

  const VerticalImageTextBox = ({
    title,
    description,
    button,
    subTitle,
    logo,
    bgImage,
    isMobile,
    mainGradientColor,
    darkGradientColor,
    brightGradientColor
}: VerticalImageTextBoxProps): React.JSX.Element => {
    const [scope, scopeAnimate] = useAnimate();
  
    const COLORS = [
        "#00e0ff", // Vibrant cyan blue (base)
        "#00a2e4", // Deep sky blue (base)
        "#0090cc", // Slightly darker blue
        "#0080b3", // Muted ocean blue
        "#4fd3f7", // Soft light blue
        "#87e8ff", // Pastel sky blue
      ];
      
    
    
    
    const color1 = useMotionValue(COLORS[0]);
    const color2 = useMotionValue(COLORS[1]);
  

  
  

  
  
  
    
  
    // Ensure you're transforming the y values based on the scroll position
  
    const inView = useInView(scope,{
     
      amount:!isMobile ? 0.7 : 0.2,
      once:true
    })
  
  
        const handleAnimation = async () => {
         const header = document.getElementById('closing-header')
         const paragraph = document.getElementById('closing-paragraph')
         const button = document.getElementById('closing-button')
  
         if(header){
          await scopeAnimate(header,{y:0,opacity:1})
       
         }
  
         if(paragraph){
          await scopeAnimate(paragraph,{opacity:1},
              {delay:1})
         }
  
         if(button){
          await scopeAnimate(button,{opacity:1},{
              delay:0.5,
              ease:'easeInOut'
              
          },)
         }
        
        }
  
        useEffect(()=> {
          if(inView){
              console.log('in view!')
              handleAnimation()
          }
      },[])
        
  
      useEffect(() => {
          // Animate the colors for the gradient
         
             animate(color1, COLORS, {
              ease: "easeInOut",
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
            });
      
             animate(color2, COLORS, {
              ease: "easeInOut",
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
            });
          
  
        
      }, []);
  
    
    return (
      <section ref={scope} className=" relative
      py-8 min-h-screen
     "
     style={{
      backgroundImage:bgImage ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImage})` : undefined,
      backgroundSize: "cover", // Ensures the image covers the container
      backgroundPosition: "center", // Centers the image
    }}
    
        >
       
  
        
  
          {/* Motion heading */}
          {/* <h3 id='closing-header'
  className="text-center relative pb-4  mr-auto font-semibold mb-2
  bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl
  translate-y-[4rem] transition-transform opacity-0"
  style={{
    backgroundImage: "linear-gradient(to right, #00e0ff, #00a2e4, #00e0ff)",
  
  }}>
            
          
            Time to elevate your digital presence
          </h3> */}
   {logo && (
             <Image
             width={600}
             height={1300}
             src={logo}
             alt="brain"
             className="w-[40vw] object-contain mx-auto relative z-[4]
             max-w-[420px] max-h-[280px] mt-[-3rem] mb-4
             "
           />
        )}
          <AppearingGradient
          text={title}
          subText={subTitle ? subTitle : ""}
          noBottom
         mainColor={mainGradientColor}
          isMobile={isMobile}
          darkColor={darkGradientColor}
          brightColor={brightGradientColor}

          />

        
       
       
  
        {/* Optional image */}
       
       
  
        {/* Call to action section */}
        <motion.section 
      

       
        className="flex flex-col justify-center md:text-lg px-4 relative z-[4] mb-8
        items-center whitespace-pre-line">
   <motion.p
   
   >{description
   }
     {button && (
    <>
    <br/>
    {button}</>

)}
   </motion.p>
  
  
  

        </motion.section>
  
      </section>
    );
  };
  


export default VerticalImageTextBox;