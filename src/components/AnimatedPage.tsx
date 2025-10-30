import { motion } from "framer-motion";

const variants = {
  enterFromRight: { x: "100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: "-100%", opacity: 0 },

  enterFromLeft: { x: "-100%", opacity: 0 },
  exitToRight: { x: "100%", opacity: 0 },
};

export const AnimatedPage: React.FC<{
  direction: "left" | "right";
  children: React.ReactNode;
}> = ({ direction, children }) => {
  const isRight = direction === "right";

  return (
    <motion.div
      key={Math.random()}
      initial={isRight ? "enterFromRight" : "enterFromLeft"}
      animate="center"
      exit={isRight ? "exitToLeft" : "exitToRight"}
      variants={variants}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      {children}
    </motion.div>
  );
};
