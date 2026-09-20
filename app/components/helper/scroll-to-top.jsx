"use client";

import { useEffect, useState } from "react";
import SlingButton from "../reactbits/SlingButton/SlingButton";

const SCROLL_THRESHOLD = 50;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-6 z-50">
      <SlingButton
        size={52}
        padColor="#0d1224"
        iconColor="#16f2b3"
        accentColor="#16f2b3"
        wellColor="#1a1443"
        bandColor="#6d28d9"
        ariaLabel="Scroll to top"
        onSend={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
};

export default ScrollToTop;
