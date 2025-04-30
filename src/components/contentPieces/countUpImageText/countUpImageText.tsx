
import Image from "next/image";
import React, { useRef } from "react";
import CountUp from 'react-countup'
import {useInView,motion,useTransform,
    easeIn, useScroll
} from 'framer-motion'
export interface CountUpImageTextProps {
    src:string,
    alt:string
    title:string,
    description:string,
    isMobile:boolean
    bgColor?:string,
    height?:string,
    width?:string,
    maxHeight?:string,
    maxWidth?:string
    stats:{
        number:string,
        name:string,
        description?:string
    }[]
    textColor?:string
}



const CountUpImageText = ({
    src,
    alt,
    title,
    description,
    stats,
    isMobile,
    bgColor,
    height,
    width,
    maxHeight,
    maxWidth,
    textColor
}: CountUpImageTextProps): React.JSX.Element => {
    // Component logic here





    const ref = useRef(null)

    const inView = useInView(ref,{
        amount:!isMobile ? 0.5 : 0.4,
        once:true
    })

    const { scrollYProgress } = useScroll({
        target: ref, // Watch this section
        offset: ["start end", "end start"], // Trigger based on when it enters and leaves the viewport
    });

    // Map scrollYProgress to scale and opacity
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95],  { ease:easeIn });

    const fadeInVariants = (delay: number) => {

        return {
            initial: { opacity: 0, x: -30, y: -20 },
            animate: { opacity: 1, x: 0, y: 0 ,
            transition: {
              duration: 0.4,
              delay: delay, // Delay based on the parameter
              ease: "easeInOut"
            }
        }
        }
       
      };

      const statVariants = (delay: number) => {

        return {
            initial: { opacity: 0, x: -50, y: 0 },
            animate: { opacity: 1, x: 0, y: 0 ,
            transition: {
              duration: 0.5,
              delay:0.3 + delay, // Delay based on the parameter
              ease: "easeInOut"
            }
        }
        }  
      };

      const ref2 = useRef(null)

      const countInView = useInView(ref2,{
        once:true
      })
      

      return (
        <motion.section
          style={{
            scale
          }}
          ref={ref}
          className={`flex flex-col bg-gray-300 mt-12 w-[97vw] rounded-2xl overflow-hidden md:flex-row-reverse mx-auto max-w-[1200px]
          ${bgColor ? `${bgColor}` : ''} ${textColor ? `${textColor}` : ''}`}
        >
          {/* Title */}
          <motion.h2
            variants={fadeInVariants(0)}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="mx-auto text-3xl  font-bold text-center sm:text-4xl md:text-5xl mt-12 mb-4 md:hidden"
          >
            {title}
          </motion.h2>
    
          <section className="relative w-[98vw] md:w-[48vw] md:block h-[80vh]
          ">
            
            <Image
              src={src}
              alt={alt}
              width={600}
              height={1300}
              className={` rounded-2xl
              z-[1]
               object-cover mx-auto md:block transition-all
               duration-1000

               ${width && height && maxHeight && maxWidth ? 
                `w-[${width}] h-[${height}] max-w-[${maxWidth}]
                max-h-[${maxHeight}]` : 'w-full h-full'}
                 mt-auto mb-auto absolute`}
              style={{
                borderRadius: "1rem"
              }}
            />
          </section>
    
          {/* Description */}
          <section className="flex flex-col px-4 md:w-[48vw]">
            <motion.h2
              variants={fadeInVariants(0)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="mx-auto text-3xl font-bold text-center sm:text-4xl md:text-5xl mt-12 mb-4 hidden md:block"
            >
              {title}
            </motion.h2>
    
            <motion.p
              variants={fadeInVariants(0.1)}
              initial="initial"
              animate={inView ? "animate" : "initial"}
              className="md:px-4 font-semibold mb-6 mt-4 md:mt-0"
            >
              {description}
            </motion.p>
    
            <section
            ref={ref2} 
            className="flex mx-auto flex-col justify-center items-center  mt-4 md:flex-row font-semibold md:mr-auto md:ml-4
            ">
              {/* Stats Loop */}
              <div className="text-2xl mb-6 flex flex-col justify-start items-start">
                {stats.map((stat, index) => {
                  const delay = 0.2 + index * 0.4;
                   const nameDelay = 0.25 + index * 0.4
                  return (
                    <div
                      key={index}
                      className="flex flex-col  items-center justify-center text-center ml-4 mb-6 md:ml-0 mr-auto"
                    >
                      <motion.p
                        variants={statVariants(delay)}
                        initial="initial"
                        animate={countInView ? "animate" : "initial"}
                        className="sm:text-xl md:text-2xl mr-auto"
                      >
                        <CountUp
                          start={0}
                          end={countInView ? parseInt(stat.number) : 0}
                          duration={2}
                          className="mr-auto sm:text-2xl"
                        />
                        {stat.description && (
                          <span>&nbsp;{stat.description}</span>
                        )}
                      </motion.p>

                      <motion.p 
                      variants={statVariants(nameDelay)}
                      initial="initial"
                      animate={countInView ? "animate" : "initial"}
                      className="mr-auto text-left self-start sm:text-3xl md:text-4xl">
                        {stat.name}
                      </motion.p>
                    </div>
                  );
                })}
                <button className="bg-blue-500
                p-3 rounded-2xl p-3">
                    Ensure success
                </button>
              </div>
            </section>
          </section>

        </motion.section>
      );
      
}

export default CountUpImageText