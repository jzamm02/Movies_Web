import React, { useState, useEffect } from "react";

import { Clapperboard } from "lucide-react";
import AnimatedToast from "./Misc/AnimatedToast";

const Header = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Helper to show toast, resetting states correctly
  const showToastMessage = (message: string) => {
    setToastMessage(message);

    if (showToast) {
      // If toast is already visible, restart exit animation to reset
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setShowToast(true);
      }, 400); // duration should match exit animation duration
    } else {
      // Normal flow: show toast and start exit timer
      setIsExiting(false);
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast && !isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, isExiting]);

  return (
    <>
      <header role="banner" aria-label="Main site header">
        <div className="header-container">
          <div className="web-title-container">
            <Clapperboard size={18} strokeWidth={2} aria-hidden="true" />
            <h1 className="web-title">Movie Collection</h1>
          </div>
          <nav aria-label="Primary navigation" className="header-links">
            <button
              onClick={() => showToastMessage("Feature coming soon...")}
              type="button"
              aria-label="About page"
            >
              About
            </button>
            <button
              onClick={() => showToastMessage("Feature coming soon...")}
              type="button"
              aria-label="Contact page"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <AnimatedToast
        showToast={showToast}
        setShowToast={setShowToast}
        toastMessage={toastMessage}
        isExiting={isExiting}
        aria-live="assertive"
        aria-label="Notification toast"
      />
    </>
  );
};

export default Header;
