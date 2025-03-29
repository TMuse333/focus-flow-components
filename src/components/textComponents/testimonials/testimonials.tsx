import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


export interface TestimonialProps {
    testimonials: {
        title?: string,
        quote: string,
        author: string,
        effect:string
    }[]
    bgColor:string
}










const Testimonials = ({ testimonials,bgColor }: TestimonialProps): React.JSX.Element => {


    const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };


    return (
        <section className={`border border-white ml-auto mr-auto max-w-[1200px] w-screen 
          relative mb-8 rounded-lg
         h-[550px] sm:w-[90vw] ${bgColor}
        `}>
            <div className="absolute sm:text-5xl top-[40%] right-0 text-2xl hover:text-blue-200
           hover:scale-[1.15] transition-all"
           onClick={nextTestimonial}>
            <span>
            <span className="font-bold text-xl text-2xl
            hover:scale-[1.05]">&gt;</span>
            </span>

           </div>
          
          <div
          className="absolute top-[40%] left-0 text-2xl
          hover:text-blue-200
          hover:scale-[1.15] transition-all sm:text-5xl" onClick={prevTestimonial}>

  
<span className="font-bold text-xl text-2xl hover:scale-[1.05]">&lt;</span>
                    </div>
            <AnimatePresence  mode='wait'>
          <motion.p key={currentTestimonial} className="font-bold mb-4 pl-8 pr-8 mt-8
          text-lg sm:text-xl sm:pl-12 sm:pr-12"
            initial={{ opacity: 0,x: -10 }}
            animate={{ opacity: 1, x:0 }}
             exit={{ opacity: 0 }}>
            {testimonials[currentTestimonial].quote}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence  mode='wait'>
          <motion.p key={currentTestimonial} className="pl-8 pr-8 sm:pl-12 sm:pr-12 sm:text-xl"
           initial={{ opacity: 0, }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0 }}
             >
            {testimonials[currentTestimonial].effect}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence  mode='wait'>
          <motion.p key={currentTestimonial} className="mt-8 pl-6 sm:pl-12 pr-8
          sm:text-lg"
           initial={{ opacity: 0, y:30 }}
            animate={{ opacity: 1, y:0,transition: { delay: 0.7 } }}
             exit={{ opacity: 0 }}>
           -{testimonials[currentTestimonial].author}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode='wait'>
          <motion.p key={currentTestimonial} className="pl-8 pr-8 sm:pl-12 sm:text-lg"
          initial={{ opacity: 0, y:30 }}
          animate={{ opacity: 1, y:0,transition: { delay: 0.8 } }}
            exit={{ opacity: 0 }}>
            {testimonials[currentTestimonial].title}
          </motion.p>
        </AnimatePresence>

        </section>
    );
};

export default Testimonials;