"use client";

import { useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function GlobalTransition({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white"
            style={{ zIndex: 9999 }}
          >
            <div
              className="spinner-border"
              role="status"
              style={{ width: "6rem", height: "6rem", color: "#8CC63F" }}
            >
              <span className="visually-hidden">Loading page...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {children}
    </>
  );
}