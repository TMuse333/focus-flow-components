
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import {motion, useInView} from 'framer-motion'

import Image from "next/image";
import Link from "next/link";

interface ListAspects {
  
    title:string,
    description:string
    index:number,
    isSelected:boolean,
    setExpandedIndex:React.Dispatch<React.SetStateAction<number | null>>;
    parentInView:boolean,
    isMobile:boolean
}


const ListElement:React.FC<ListAspects> = ({
title,description,index,
isSelected, setExpandedIndex,
parentInView,
isMobile
}) => {

    const handleClick = (index:number) => {
        setExpandedIndex(index);
      };

      const ref = useRef(null)

      const inView = useInView(ref,{
        once:true,
        amount:0.3
      })
    
      const slideInVariants = (delay:number) => {

        return {
            initial:{
                x:40,
                y:33,
                opacity:0
            },
            animate:{
                x:0,
                y:0,
                opacity:1,
                transition:{
                    delay:delay,
                    duration:0.3
                }
            }
        }
      }



          //#a8865e darker dark
    //#e7c696 slightly bright
    //#f2d99d brighter bright

    return (

        <motion.div  ref={ref}
        variants={slideInVariants(index * 0.15)}
        initial='initial'
        animate={(!isMobile && parentInView) || inView ? 'animate' : 'initial'}
        className="bg-button-color rounded-3xl overflow-hidden 
        border border-black border-2 text-white">
        <button
          className="w-full flex justify-between items-center text-left text-white p-4 font-semibold bg-[#3B6D74] rounded-t-lg focus:outline-none"
          onClick={() => handleClick(index)}
        >
          <span className="">{title}</span>
          <span>
            {isSelected ? (
              <ChevronUp />
            ) : (
              <ChevronDown />
            )}
          </span>
        </button>
        <div
          className={`transition-all  text-white duration-500  ease-in-out bg-gray-300 overflow-hidden ${
            isSelected ? "h-[30vh] lg:h-[30vh]" : "h-0"
          }`}
        >
          <div className="p-4">
            <p className="text-black">{description}</p>
          </div>
        </div>
      </motion.div>
    )
}


export interface TextAndListProps {
    subTitle:string
    title:string,
    src?:string,
    alt?:string,
    description:string,
    link?:string,
    isMobile:boolean
    listAspects:{
        src:string,
        alt:string,
        title:string,
        description:string
    }[]
}


const TextAndList = ({
    title,
    description,
    listAspects,
    subTitle,
    src,
    alt,
    link,
    isMobile,
  }: TextAndListProps): React.JSX.Element => {
  



    const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

    useEffect(()=>{
        console.log('expanded index',expandedIndex)
      },[expandedIndex])

    // const handleClick = (index:number) => {
    //     setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    //   };

      const ref = useRef(null)

      const inView = useInView(ref,{
        once:true,
        amount:0.7
      })

    //   const dropDownAnimation = (delay:number) => {
    //     return {
    //         initial:{
    //             opacity:0,
    //             y:30
    //         },
    //         animate:{
    //             opacity:1,
    //             y:0,
    //             transition:{
    //                 delay:delay
    //             }
    //         }
    //     }
    //   }
   
      return (
        <section className="w-full py-12  bg-gradient-to-b from-[#4D8890] to-[#4D8890]">


        <section ref={ref}
        className="flex flex-col md:flex-row
         text-black md:w-[90vw] overflow-x-hidden
        mx-auto">
          {/* Top Section */}
          <section className="flex flex-col justify-center items-center
          space-y-4 p-4
          mb-auto text-center">
            <h3 className="text-lg font-semibold text-white">{subTitle}</h3>
            <h2 className="text-3xl font-bold text-white
            text-center font-cursive">{title}</h2>
            {src && alt && (
              <Image
              width={600}
              height={1300}
                src={src}
                alt={alt}
                className="rounded-xl relative md:w-[50vw] w-[90vw] h-[80vh] md:h-[45vw] max-h-[467px]
                max-w-[668px] mx-auto object-cover"
              />
            )}
            <p className="text-white
            md:text-left">{description}</p>
            {link && (
<>
              <Link
              href={link}>

              
            <button className="p-3 rounded-2xl
            bg-[#00bfff] text-black">
                Contact
            </button>
            </Link>
            </>
                       )}
          </section>
    
          {/* Accordion Section */}
          <section
            className={` rounded-xl mx-auto w-[90vw] p-5  max-w-[800px]
            my-auto`}
          >
            <div className="space-y-4">
              {listAspects.map((aspect, index) => (
                <ListElement
                {...aspect}
                key={index}
                index={index}
                isSelected={index === expandedIndex}
                setExpandedIndex={setExpandedIndex}
                parentInView={inView}
                isMobile={isMobile}
                />
              ))}
            </div>
          </section>
        </section>
        </section>
      );
}


export default TextAndList