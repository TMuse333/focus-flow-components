
import React from "react";
import Image from 'next/image'
import Link from "next/link";


interface ElementProps {
    title:string,
    src:string,
    alt:string,
    description:string,
    buttonText:string,
    destination:string,
    buttonColor:string,
    buttonHover:string
   
    
}

const Element:React.FC<ElementProps> = ({
    title,src,alt,description,buttonText,
    destination,buttonColor,buttonHover,
    
}) => {

    return (
       <>
            <h2 className="text-white text-center
            text-2xl mb-4 font-semibold">{title}</h2>
            <Image 
            src={src}
            alt={alt}
            width={600}
            height={1300}
            className='w-[40vw]  h-[20vw]
            max-h-[150px] mx-auto object-contain
            max-w-[200px] bg-gray-300 rounded-2xl'
            />
            <p className="text-white my-4 font-semibold">{description}</p>
            <button className={`${buttonColor} ${buttonHover}
           
            p-2 rounded-2xl text-white`}>
                <Link href={destination}>
                    {buttonText}
                </Link>
            </button>


            </>

    )
}

export interface DisplayBoxProps {
    data:ElementProps[],
    bgColor?:boolean
    boxColor:string,
    glowColor?:string,
    hoverColor:string,
    boxTextColor?:string
    
    

}

    const DisplayBoxes = ({
        data,bgColor,boxColor,hoverColor,glowColor,
        boxTextColor
        
    }:DisplayBoxProps) : React.JSX.Element => {


        return (
            <section className={`w-screen relative
            ${bgColor ? `${bgColor}` : ''}`}
            >

           
            <section className="flex flex-col
            sm:grid grid-cols-2 justify-center
            items-center max-w-[1200px]
            mx-auto gap-4 
             pt-5">
              
                {data.map((data, index) => (
                  <div 
                  key={index}
                  className={`w-[90vw] mx-auto flex mt-2 p-4 rounded-2xl flex-col justify-center 
                  items-center relative mb-4 ${glowColor} hover:scale-[1.05] ${boxTextColor ? `${boxTextColor}` : ''}
                  ${boxColor} sm:w-[45vw] max-w-[500px] mb-8 group transition-all duration-300
                  ${hoverColor}`}>
                
                  {/* Inner div with hover gradient effect */}
                  {/* <div className="w-[90vw] h-full max-w-[500px] h-full p-4 rounded-2xl transition-all duration-300 
                  bg-gradient-to-br from-blue-400 to-red-400 group-hover:bg-gradient-to-br 
                  group-hover:from-red-400 group-hover:to-blue-400 relative z-[2]"> */}
                    
                    {/* Your element */}
                    <Element {...data} />
                  
                  {/* </div> */}
                </div>
                
                ))}
            </section>
            </section>

        )
    }


    export default DisplayBoxes