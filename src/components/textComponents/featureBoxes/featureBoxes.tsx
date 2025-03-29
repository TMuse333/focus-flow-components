import Image from "next/image";
import React from "react";
import SlidingText from "../../textAnimations/slidingText/slidingText"


interface BoxProps {
    src:string,
    alt:string,
    title:string,
    description:string
    boxColor:string

}

export interface FeatureBoxProps {
    title?:string,
    description?:string,
    boxData:{
        src:string,
    alt:string,
    title:string,
    description:string

    }[]
    boxColor:string,
    bgColor?:string,
    titleSlideColor?:string
}


const FeatureBox:React.FC<BoxProps> = ({
    src,alt,title,description,
    boxColor
    
}) => {

    return (
        <div className={`w-[90vw] mx-auto p-4 mb-8
        border border-black rounded-xl sm:w-[40vw]
       ${boxColor} max-w-[550px]
        `}>
            <Image
            src={src}
            alt={alt}
            width={600}
            height={1300}
            className='w-[30px] sm:w-[35px] md:h-[40px] mx-auto mb-4 object-contain
            '
            />
            <h3 className="text-lg text-black font-semibold">{title}</h3>
            <p>{description}</p>
        </div>
    )
}


const FeatureBoxes = ({
    boxData, title, description,
    boxColor, bgColor,titleSlideColor

}:FeatureBoxProps):React.JSX.Element => {


    return (
        <section className={`md:h-screen w-screen
        ${bgColor ? `${bgColor}` : ''}`}>
        {/* <AppearingGradient
  text={title}
  subText={description}
  

/> */}

{title && description && (
    <SlidingText
text={title}
styles="text-center mx-auto text-4xl
sm:text-5xl md:text-6xl mb-4
text-black "
subText={description}
slideColor={titleSlideColor ? titleSlideColor : ''}
/>
)}





        <section className="flex flex-col mx-auto
        justify-center items-center mt-6
        sm:grid grid-cols-2 max-w-[1200px]

        ">

            {boxData.map((box, index) => (
                <FeatureBox
                {...box}
                key={index}
                boxColor={boxColor}
                />

            ))}

</section>
        </section>
    )
}

export default FeatureBoxes