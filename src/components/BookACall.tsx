import { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { AnimatePresence, motion } from "motion/react";

const Avatar = ({ isStepTwo = false }: { isStepTwo?: boolean }) => {
  return (
    <motion.img
      src={avatar}
      width={40}
      height={40}
      initial={{
        opacity: 0,
        x: isStepTwo ? 20 : -20,
        rotate: isStepTwo ? 0 : -40,
      }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{
        opacity: 0,
        x: isStepTwo ? 20 : -20,
        rotate: isStepTwo ? 0 : -40,
      }}
      transition={{ duration: isStepTwo ? 0.2 : 0.4 }}
      alt="Avatar"
      className="rounded-full"
    />
  );
};
const YouBadge = ({ isStepTwo = false }: { isStepTwo?: boolean }) => {
  return (
    <motion.span
      initial={{ opacity: 0, x: 20, rotate: isStepTwo ? 0 : 40 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      exit={{ opacity: 0, x: 20, rotate: isStepTwo ? 0 : 40 }}
      transition={{ duration: 0.4 }}
      className="w-10 h-10 bg-white rounded-full flex justify-center items-center text-black text-xs"
    >
      You
    </motion.span>
  );
};

const BookACall = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [step, setStep] = useState(1);
  useEffect(() => {
    if (isHovered) {
      setTimeout(() => {
        setStep(2);
      }, 600);
    } else {
      setStep(1);
    }
  }, [isHovered]);
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-14 px-2 w-[200px] rounded-4xl gradient border border-white/30 text-white uppercase font-medium tracking-wider"
    >
      <AnimatePresence>
        {isHovered && (
          <>
            {step === 1 && (
              <div className="flex justify-center items-center gap-2">
                <Avatar />
                <motion.span exit={{ opacity: 0, x: -20 }}>+</motion.span>
                <YouBadge />
              </div>
            )}
            {step === 2 && (
              <div className=" flex items-center ">
                <div className="flex items-center relative ">
                  <Avatar isStepTwo />
                  <div className="-translate-x-5">
                    <YouBadge isStepTwo />
                  </div>
                </div>
                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  let's talk
                </motion.span>
              </div>
            )}
          </>
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
    </button>
  );
};

export default BookACall;