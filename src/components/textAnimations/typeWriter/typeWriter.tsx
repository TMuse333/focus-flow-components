import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface TypeWriterProps {
    examples:string[]
}

const TypeWriter = ({ examples,  }: TypeWriterProps): React.JSX.Element => {
  return (
    <div className="flex items-start justify-start  px-8 text-white
    ">
      <BlockInTextCard
        tag="/ Support"
        text={
          <>
            {/* <strong></strong> We'd love to help! Contact support
            for any issue you may face. */}
          </>
        }
        examples={examples}
      />
    </div>
  );
};

const BlockInTextCard = ({
 
  examples,
}: {
  tag: string;
  text: ReactNode;
  examples: string[];
}) => {
  return (
    <div className="w-full max-w-xl space-y-6">
     
      <div className="mb-[-1rem]">
        <Typewrite examples={examples} />
        <hr className="border-white" />
      </div>
      <section className="flex items-center relative z-[3] mt-[-1rem]">
      <button className=" rounded-full border border-white p-3 text-lg border-3 font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100
      mr-4">
        Contact
      </button>
      <button className=" rounded-full border border-white border-3 p-3 text-lg font-medium transition-colors hover:bg-neutral-950 hover:text-neutral-100">
        Free e-book
      </button>
  
      </section>
     
    </div>
  );
};

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }: { examples: string[] }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className="mb-2.5 text-xl  md:text-2xl font-light uppercase
    font-semibold
    relative z-[3]">
      <span className="inline-block size-2 bg-neutral-950" />
      <span className="ml-3">
        
        {examples[exampleIndex].split("").map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

export default TypeWriter