import { AnimatePresence, motion } from "motion/react";

const ShadowOverlay = ({ allowScroll }: { allowScroll: boolean }) => {
  return (
    <>
      <AnimatePresence>
        {allowScroll ? null : (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="locked-shadow-overlay"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ShadowOverlay;
