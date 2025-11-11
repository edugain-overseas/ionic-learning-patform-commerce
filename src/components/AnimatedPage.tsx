// AnimatedPage.tsx
import React from "react";
import { motion } from "framer-motion";

const variants = {
  enterFromRight: { x: "100%", opacity: 0 },
  enterFromLeft: { x: "-100%", opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: "-100%", opacity: 0 },
  exitToRight: { x: "100%", opacity: 0 },
};

const AnimatedPage: React.FC<{
  direction: "left" | "right";
  children: React.ReactNode;
  pageKey: string; // передаємо унікальний key від Router
}> = ({ direction, children, pageKey }) => {
  const isRight = direction === "right";

  return (
    <motion.div
      key={pageKey} // дуже важливо: унікальний ключ сторінки
      initial={isRight ? "enterFromRight" : "enterFromLeft"}
      animate="center"
      exit={isRight ? "exitToLeft" : "exitToRight"}
      variants={variants}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        // background щоб бачити нічого не просвічувало під час анімації
        background: "var(--ion-background-color, #fff)",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
