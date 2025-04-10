import React, { useState, useEffect, useRef } from "react";

import Image from "next/image";
import { motion } from "framer-motion";
import SlidingText from "../../textAnimations/slidingText/slidingText";

export interface TiltingContentProps {
    title: string;
    src: string;
    alt: string;
    description: string;
    button?: React.ReactNode;
    bgColor: string;
    reverse?:boolean,
    objectCover?:boolean,
    imageMargin?:string
    textBgColor:string
}

//title is result
//subtitle is counter to objection

const TiltingContent = ({
    title,
    src,
    alt,
    description,
    button,
    bgColor,
    reverse,
    objectCover,
    imageMargin,
    textBgColor
}: TiltingContentProps): React.JSX.Element => {
    const [tiltAngle, setTiltAngle] = useState(30);
    const contentRef = useRef<HTMLDivElement>(null);


    const [slideComplete, setSlideComplete] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const contentElement = contentRef.current;
            if (!contentElement) return;
    
            const elementTop = contentElement.getBoundingClientRect().top;
            const elementHeight = contentElement.clientHeight;
            const windowHeight = window.innerHeight;
    
            const visiblePercent = Math.max(0, Math.min(100, (windowHeight - elementTop) / windowHeight * 100));
    
            // Reach zero tilt earlier by lowering the divisor
            const newTiltAngle = Math.max(0, 30 - (visiblePercent / 70) * 30);

    
            setTiltAngle(newTiltAngle);
    
            const offset = 350;
            // if (elementTop < windowHeight - offset) {
            //     setTiltComplete(true);
            // }
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    

    return (
        <section
            id={`tilting-${title}`} // Dynamic ID based on the title
            ref={contentRef}
            className={`w-screen
            pb-8 md:pb-0
             md:h-[60vh] ${bgColor}`}
            style={{
                transform: `perspective(1000px) rotateX(${tiltAngle}deg)`,
                transition: "transform 0.2s ease-out"
            }}
        >
                <section className={`flex flex-col 
                w-full
                ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}
                justify-center items-center md:h-[60vh]`}>

                
                <div className={`flex flex-col justify-center
                md:w-[40vw]  max-w-[600px]
            md:h-[60vh] ${textBgColor}
               rounded-2xl
        `}>

 
                    <SlidingText
                        text={title}
                        styles="text-4xl  font-bold
                        text-center 
                        md:translate-y-4
                        rounded-2xl md:p-4 py-1 px-6 text-white mb-4"
                        reverse
                        setSlideComplete={setSlideComplete}
                        xPercent={0.5}
                    />

                    {/* <div className={`${slideComplete ? 'w-[40vw]' : 'w-[0vw]'}
                    transition-all h-[2px] bg-blue-400
                    rounded-2xl duration-700
  max-w-[300px]
                    mb-12 mt-1` }
                    /> */}


                    <motion.p
                    className="
                    rounded-2xl p-8 text-white hidden
                    md:block"
                    animate={{
                        y: slideComplete ? 0 : -30,
                        opacity: slideComplete ? 1 : 0,
                        transition:{
                            delay:0.4
                        }
                    }}
                    >{description}
                    {button && (
                        <>
                        <br/>
                        {button}
                        </>
                    )}
                    </motion.p>
  
                        </div> 
                         <section className="flex flex-col md:flex-row">

                        <motion.div
                     animate={{
                        x: slideComplete ? 0 : reverse ? -30 : 30,
                        opacity: slideComplete ? 1 : 0,
                        transition:{
                            delay:0.6
                        }
                    }}
                    className="md:w-[50vw] w-[90vw] h-[80vh] md:h-[55vw] max-h-[667px]
                    max-w-[768px]"
                    >
                    <Image
                    src={src}
                    alt={alt}
                    width={600}
                    height={1300}
                    className={`rounded-xl relative w-full h-full mx-auto ${!objectCover ? 'object-contain' : 'object-cover object-[100%]'}
                    ${imageMargin ? `${imageMargin}` : ''}
                    `
                }
                    />
                        </motion.div>
                        <motion.p
                    className={`
                    rounded-2xl p-8 text-white md:hidden
                    
                    ${textBgColor}`}
                    animate={{
                        y: slideComplete ? 0 : -30,
                        opacity: slideComplete ? 1 : 0,
                        transition:{
                            delay:0.4
                        }
                    }}
                    >{description}</motion.p>
                        </section>


</section>

                 
        </section>
    );
};

export default TiltingContent;
