"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function AnimatedPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        // initial={{ opacity: 0, y: 0 }}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1], // ease-in-out (classic cubic-bezier)
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
