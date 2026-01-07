"use client";
import { useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface IPageLoaderProps {
  isLoading?: boolean;
  children: ReactNode;
  minDuration?: number;
  className?: string;
}

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export default function PageLoader({
  isLoading = false,
  children,
  minDuration = 1000,
  className = "",
}: IPageLoaderProps) {
  const [isMinLoading, setIsMinLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsMinLoading(false);
      }, minDuration);
      return () => clearTimeout(timer);
    }
  }, [minDuration, isLoading]);

  const showLoader = isLoading || isMinLoading;

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`d-flex justify-content-center align-items-center ${className}`}
          style={{ minHeight: "100%" }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ width: "4rem", height: "4rem", color: "#8CC63F" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
