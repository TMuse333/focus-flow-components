
import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";

import {motion, useInView} from 'framer-motion'

import Image from "next/image";


interface ListAspects {
  
    title:string,
    description:string
    index:number,
    isSelected:boolean,
    setExpandedIndex:React.Dispatch<React.SetStateAction<number | null>>;
    parentInView:boolean,
    isMobile:boolean,
    titleColor?:string,
    titleBgColor?:string,
    descriptionBgColor?:string,
    descriptionTextColor?:string
}


const ListElement:React.FC<ListAspects> = ({
title,description,index,
isSelected, setExpandedIndex,
parentInView,
isMobile,
titleColor,
titleBgColor,
descriptionBgColor,
descriptionTextColor
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
        className=" rounded-3xl overflow-hidden 
        border border-black border-2">
        <button
          className={`w-full flex justify-between items-center text-left p-4 font-semibold ${titleBgColor ? `${titleBgColor}` : ''} rounded-t-lg focus:outline-none`}
          onClick={() => handleClick(index)}
        >
          <span className={`${titleColor ? `${titleColor}` : ''}`}>{title}</span>
          <span>
            {isSelected ? (
                <>
                up
                </>
          
            ) : (
          <>
          down
          </>
            )}
          </span>
        </button>
        <div
          className={`transition-all  duration-500  ease-in-out ${descriptionBgColor ? `${descriptionBgColor}` : ''} overflow-hidden ${
            isSelected ? "h-[30vh] lg:h-[30vh]" : "h-0"
          }`}
        >
          <div className="p-4">
            <p className={`${descriptionTextColor ? `${descriptionTextColor}` : ''}`}>{description}</p>
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
    button?:React.ReactNode
    isMobile:boolean,
    bgColor?:string
    listAspects:{
  
        title:string,
        description:string
    }[],
    titleColor:string,
    titleBgColor:string,
    descriptionBgColor:string,
    descriptionTextColor:string,
    textColor?:string
}


const TextAndList = ({
    title,
    description,
    listAspects,
    subTitle,
    src,
    alt,
   button,
    isMobile,
    bgColor,
    titleColor,
    titleBgColor,
    descriptionBgColor,
    descriptionTextColor,
    textColor
    
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
        <section className={`w-full py-12  
        ${bgColor ? `${bgColor}` : ''}`}>


        <section ref={ref}
        className="flex flex-col md:flex-row
    md:w-[90vw] overflow-x-hidden
        mx-auto">
          {/* Top Section */}
          <section className={`flex flex-col justify-center items-center
          space-y-4 p-4 ${textColor ? `${textColor}` : ''}
          mb-auto text-center`}>
            <h3 className="text-lg font-semibold ">{subTitle}</h3>
            <h2 className="text-3xl font-bold
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
            <p className="
            md:text-left">{description}</p>
            {button && (
            <>
            {button}
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
                titleColor={titleColor}
                descriptionBgColor={descriptionBgColor}
                descriptionTextColor={descriptionTextColor}
                titleBgColor={titleBgColor}
                />
              ))}
            </div>
          </section>
        </section>
        </section>
      );
}


export default TextAndList