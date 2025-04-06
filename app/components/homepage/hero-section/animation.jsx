"use client"
import { TypeAnimation } from "react-type-animation"
import styles from "./hacker-typing.module.css"

const HackerTyping = () => {
  return (
    <div className="relative p-6 rounded-lg shadow-lg w-full max-w-2xl border border-[#00ff00] overflow-hidden">
      {/* Animated gradient background */}
      <div
        className={styles.gradientBackground}
        style={{
          background: "linear-gradient(-45deg, #0a0a23, #121330, #0f1a2c, #0a192f)",
        }}
      />

      {/* Animated glowing border effect - with reduced opacity */}
      <div
        className={styles.glowingBorder}
        style={{
          background:
            "linear-gradient(-45deg, rgba(0, 255, 213, 0.15), rgba(255,0,128,0.3), rgba(0, 255, 213, 0.15), rgba(255,0,128,0.3))",
        }}
      />

      {/* Horizontal scan lines that move across the screen */}
      <div className={styles.horizontalScanline}></div>
      <div className={styles.horizontalScanline} style={{ animationDelay: "1.5s" }}></div>
      <div className={styles.horizontalScanline} style={{ animationDelay: "3s" }}></div>

      {/* Content with text */}
      <div className="relative z-10 font-mono text-[#33ff33] opacity-90">
        <TypeAnimation
          sequence={[
            `$ Initializing system...\n
            $ Establishing [in]secure connection...\n
            $ Access granted. Welcome to my portfolio!\n
            $ Prompt engineering...\n
            $ Decrypting Lorem Ipsum...\n
            $ Mining Bitcoin...\n
            $ Running scan...\n
            $ OUTPUT: Humans are the weakest link.\n
            $ Enjoy （ ￣ ︶ ￣ ）↗　`,
            3000, // Pause before clearing everything
            "",
          ]}
          wrapper="pre"
          cursor={true}
          repeat={Number.POSITIVE_INFINITY}
          speed={80}
          deletionSpeed={{ type: "keyStrokeDelayInMs", value: 5 }}
          omitDeletionAnimation={false}
          style={{ whiteSpace: "pre-line" }}
        />
      </div>
    </div>
  )
}

export default HackerTyping

