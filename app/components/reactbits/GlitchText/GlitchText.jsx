"use client";

import './GlitchText.css';

const GlitchText = ({
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = true,
  className = '',
}) => {
  const inlineStyles = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 #ff0080' : 'none',
    '--before-shadow': enableShadows ? '5px 0 #16f2b3' : 'none',
  };

  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <span className={`glitch ${hoverClass} ${className}`} style={inlineStyles} data-text={children}>
      {children}
    </span>
  );
};

export default GlitchText;
