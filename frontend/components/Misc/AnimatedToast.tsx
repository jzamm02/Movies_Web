import { CircleAlert } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";

interface AnimatedToastProps {
  showToast: boolean;
  setShowToast: (value: boolean) => void;
  toastMessage: string;
  isExiting: boolean;
}

const AnimatedToast: React.FC<AnimatedToastProps> = ({
  showToast,
  setShowToast,
  toastMessage,
  isExiting,
}) => {
  return (
    <>
      <AnimatePresence>
        {showToast && !isExiting && (
          <motion.div
            role="alert"
            aria-live="assertive"
            className="toast-container"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onAnimationComplete={(definition) => {
              if (definition === "exit") {
                setShowToast(false);
              }
            }}
          >
            <CircleAlert size={16} className="toast-icon" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedToast;
