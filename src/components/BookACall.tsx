import { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { AnimatePresence, motion } from "motion/react";

const Avatar = () => {
  return (
    <motion.img
      src={avatar}
      width={32}
      height={32}
      initial={{
        opacity: 0,
        x: -20,
        y: 20,
        rotate: -40,
      }}
      animate={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
      exit={{
        opacity: 0,
        x: -20,
        rotate: -40,
        y: 20,
      }}
      transition={{ duration: 0.4 }}
      alt="Avatar"
      className="rounded-full"
    />
  );
};
const YouBadge = () => {
  return (
    <motion.span
      initial={{ opacity: 0, x: -20, rotate: 40, y: 20 }}
      animate={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
      exit={{ opacity: 0, x: -20, rotate: 40, y: 20 }}
      transition={{ duration: 0.4 }}
      className="w-8 h-8 bg-black rounded-full flex justify-center items-center text-white text-xs"
    >
      You
    </motion.span>
  );
};

const BookACall = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const timeout = setTimeout(() => {
        setShowText(true);
      }, 400);

      return () => clearTimeout(timeout);
    } else {
      setShowText(false);
    }
  }, [isHovered]);

  const text = "Let's Talk";

  const DURATION = 0.25;
  const STAGGER = 0.025;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className=" h-14 w-[125px]  cursor-pointer p-[3px] outline-none rounded-4xl gradient text-black  tracking-tight flex justify-center items-center shadow-[0px_0px_0.22px_0.67px_#0000000D]"
    >
      <div className="bg-gradient-to-b from-[#f4f4f4] overflow-hidden to-[#fefefe] w-full h-full rounded-3xl p-1.5 flex  items-center relative ">
        <AnimatePresence>
          {isHovered && (
            <div className="flex items-center justify-evenly gap-2">
              <div className="flex items-center relative ">
                <Avatar />
                <div className="-translate-x-5">
                  <YouBadge />
                </div>
              </div>
              {showText && (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden whitespace-nowrap  w-full"
                >
                  <div>
                    {text.split("").map((l, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: "-100%" }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{
                          delay: i * STAGGER,
                          duration: DURATION,
                          ease: "easeInOut",
                        }}
                        className="inline-block "
                      >
                        {l}
                      </motion.span>
                    ))}
                  </div>

                  <div className=" absolute inset-0 ">
                    {text.split("").map((l, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{
                          delay: i * STAGGER,
                          duration: DURATION,
                          ease: "easeInOut",
                        }}
                        className="inline-block"
                      >
                        {l}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {!isHovered && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex justify-center items-center"
            >
              Book a Call
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};

export default BookACall;
