
import React, {useState} from "react";
// import {motion, animate, useInView} from 'framer-motion'

interface PriceCard {
    name:string,
    price:string,
    description:string,
    aspects:string[]
    cardColor:string
  
}


const PriceCard:React.FC<PriceCard> = ({
    name,price,description,
    aspects,cardColor
   
}) => {

    // const nameRef = useRef(null)

    const [style, setStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - card.left; // X position relative to the card
        const y = e.clientY - card.top; // Y position relative to the card
        const centerX = card.width / 2;
        const centerY = card.height / 2;

        // Calculate rotation
        const rotateX = ((y - centerY) / centerY) * 10; // Adjust intensity (10 degrees max)
        const rotateY = ((x - centerX) / centerX) * -10;

        setStyle({
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        });
    };

    const handleMouseLeave = () => {
        setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' }); // Reset tilt
    };

    return (
        <div className={`w-[90vw]
        md:w-[30vw] rounded-2xl
        text-black
        border border-white mx-auto flex flex-col
        items-center justify-center md:h-[80vh]
         max-w-[350px] mb-6 pb-8
        
      ${cardColor}        transition-colors
         `}
         style={style}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}>
            <p>{name}</p>
            <p className="text-4xl my-2 text-center">{price}</p>
            <p className="px-4">{description}</p>
            <div className="w-[75%]
            h-[5px] mx-auto bg-black
            bg-opacity-[0.3] my-6
            rounded-2xl"
            />
            <ul className="h-[60%] ">
            {aspects.map((aspect,index) => (
                <li key={index}
                className="list-disc mb-4
                w-[60%] mr-auto ml-8
                ">
                    {aspect}
                </li>
            ))}
            </ul>
        </div>
    )
}

export interface PriceCardsProps {
     title?:string,
     description?:string
    priceData:PriceCard[]
    cardColor:string
}


const PriceCards = ({
    priceData, title,description,cardColor
}:PriceCardsProps):React.JSX.Element => {



    return (
        <>
        {title && description && (
            <>
           <h2 className={`bg-gradient-to-b  text-black }
           text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center relative transition-colors
           mb-8`}>
            {title}
           </h2> 
           <p className={`w-[80vw] mx-auto text-xl
                transition-opacity
               text-lg sm:text-xl my-8 text-black`}>
            {description}</p>
           </>
        )}
        <section className="flex flex-col
        mx-auto justify-center md:flex-row
        max-w-[1200px]">
            {priceData.map((price,index) => (
                <PriceCard
                {...price}
                key={index}
                cardColor={cardColor}
                />
            ))}
        </section>
        </>
    )
}

export default PriceCards