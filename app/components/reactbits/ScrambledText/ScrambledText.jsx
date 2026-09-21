"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

import './ScrambledText.css';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ScrambledText = ({
  radius = 80,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children,
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    if (!rootRef.current) return;

    const split = SplitText.create(rootRef.current.querySelector('span'), {
      type: 'chars',
      charsClass: 'char',
    });
    charsRef.current = split.chars;

    charsRef.current.forEach((c) => {
      gsap.set(c, {
        display: 'inline-block',
        attr: { 'data-content': c.innerHTML },
      });
    });

    const handleMove = (e) => {
      charsRef.current.forEach((c) => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || '',
              chars: scrambleChars,
              speed,
            },
            ease: 'none',
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      split.revert();
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <span ref={rootRef} className={`scrambled-text ${className}`} style={style}>
      <span>{children}</span>
    </span>
  );
};

export default ScrambledText;
