import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
// import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  delay = 0.8,
  gradientIdx = 3,
  duration = 3,
}: {
  words: string;
  className?: string;
  delay?: number;
  gradientIdx?: number;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: duration,
        delay: stagger(delay),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              // change here if idx is greater than 3, change the text color to #CBACF9
              className={` ${
                idx == gradientIdx
                  ? "bg-gradient-to-r from-[#a5fecb] to-[#6dd5ed] p-2 inline-block text-transparent bg-clip-text"
                  : "text-white"
              } opacity-0`}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className="text-white flex justify-center items-center">
      <span className={` text-center bg-gradient-to-r from-indigo-600  to-green-500 inline-block text-transparent bg-clip-text ${className}`}>
        {renderWords()}
      </span>
    </div>
  );
};
