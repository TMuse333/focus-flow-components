import React, { useState, useEffect } from "react";
import { motion, useAnimate, useInView } from "framer-motion";


// Utility function to adjust brightness
const adjustBrightness = (color: string, amount: number) => {
    let usePound = false;
    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }
    let num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00ff) + amount;
    let b = (num & 0x0000ff) + amount;
    
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    
    return (usePound ? "#" : "") + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export interface AppearingGradientProps {
    text: string;
    subText: string;
    description?: boolean;
    noBottom?: boolean;
    color: string;
    isMobile:boolean
}

const AppearingGradient: React.FC<AppearingGradientProps> = ({
    text, subText, description, noBottom, color,
    isMobile
}): React.JSX.Element => {
    const [scope, animate] = useAnimate();

    const [lineComplete, setLineComplete] = useState(false);
    const [startSpring, setStartSpring] = useState(false);
    const isInView = useInView(scope, {
        amount: isMobile ? 0.4 : 0.75
    });
    
    const lighterColor = adjustBrightness(color, 40);
    const darkerColor = adjustBrightness(color, -40);
    
    const handleAnimation = async () => {
        if (lineComplete) return;
        const lineElement = document.getElementById(`${text}-line`);
        const coverElement = document.getElementById(`${text}-cover`);
        const subHeaderElement = document.getElementById(`${text}-subHeader`);
        if (lineElement) {
            await animate(lineElement, {
                width: '100vw',
                height: '50px',
            });
            setStartSpring(true);
            if (coverElement) {
                await animate(coverElement, { opacity: 0 }, { duration: 1.5 });
            }
            setLineComplete(true);
            await animate(lineElement, {
                height: '0px',
            });
            if (subHeaderElement) {
                await animate(subHeaderElement, { opacity: 1 });
            }
        }
    };

    useEffect(() => {
        if (isInView) {
            handleAnimation();
        }
    }, [isInView]);
    
    return (
        <section ref={scope} className='pt-12 relative mb-10 mx-auto'>
            <div
                id={`${text}-line`}
                className={`w-[0vw] mx-auto absolute z-[3] top-0 h-[0px] transition-all bg-[${lighterColor}] shadow-lg shadow-[${lighterColor}] max-w-[1200px] rounded-b-full left-1/2 -translate-x-1/2`}
                style={{ transition: `width 0.2s, height ${lineComplete ? '1s 1s' : '0.2s'}, border-bottom 1.1s ease-in` }}
            />
            <div className="relative">
                {!noBottom && (
                    <div id={`${text}-cover`} className="absolute z-[2] bg-gray-300 rounded-b-full h-[120px] w-[60vw] -translate-y-[0.75rem] left-1/2 -translate-x-1/2 top-0" />
                )}
                <motion.h2
                    id={`${text}-header`}
                    className="mt-6 text-center font-semibold text-3xl sm:text-4xl md:text-5xl bg-clip-text text-transparent relative z-[2] pb-4 px-4"
                    style={{ backgroundImage: `linear-gradient(to right, ${color}, ${color}, ${color})` }}
                    initial={{ translateY: "-2rem", opacity: 0 }}
                    animate={startSpring ? { translateY: "0rem", opacity: 1 } : {}}
                    transition={{ type: "spring", stiffness: 500, damping: 7 }}
                    whileInView={{
                        backgroundImage: [
                            `linear-gradient(to right, ${color}, ${darkerColor}, ${color})`,
                            `linear-gradient(to right, ${lighterColor}, ${color}, ${lighterColor})`,
                            `linear-gradient(to right, ${color}, ${darkerColor}, ${color})`
                        ],
                        transition: {
                            repeat: Infinity,
                            repeatType: "mirror",
                            duration: 3,
                        },
                    }}
                >
                    {text}
                </motion.h2>
                <h3 id={`${text}-subHeader`} className={`text-center text-black mt-4 px-6 ${!description ? 'text-xl sm:text-2xl md:text-3xl' : 'text-md sm:text-lg md:text-xl'} opacity-0`}>
                    {subText}
                </h3>
            </div>
        </section>
    );
};

export default AppearingGradient;
