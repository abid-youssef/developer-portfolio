"use client"
import { TypeAnimation } from "react-type-animation"
import styles from "./hacker-typing.module.css"
import LetterGlitch from "../../reactbits/LetterGlitch/LetterGlitch"

const HackerTyping = () => {
  return (
    <div className="relative rounded-lg shadow-lg w-full max-w-2xl border border-[#1f2a1f] overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient background, kept near-black so it reads as a terminal, not a colorful panel */}
      <div
        className={styles.gradientBackground}
        style={{
          background: "linear-gradient(-45deg, #050505, #0a0a0a, #0d0f0d, #080808)",
        }}
      />

      {/* Animated glowing border effect - subtle, monochrome green */}
      <div
        className={styles.glowingBorder}
        style={{
          background:
            "linear-gradient(-45deg, rgba(0, 255, 90, 0.06), rgba(0, 255, 90, 0.12), rgba(0, 255, 90, 0.06), rgba(0, 255, 90, 0.12))",
        }}
      />

      {/* Very faint glitch texture, sits above the gradient/glow layers but under the scanlines and text */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]">
        <LetterGlitch
          glitchColors={['#16f2b3']}
          glitchSpeed={70}
          smooth
        />
      </div>

      {/* Horizontal scan lines that move across the screen */}
      <div className={styles.horizontalScanline}></div>
      <div className={styles.horizontalScanline} style={{ animationDelay: "1.5s" }}></div>
      <div className={styles.horizontalScanline} style={{ animationDelay: "3s" }}></div>

      {/* Terminal title bar */}
      <div className="relative z-10 flex items-center gap-2 border-b border-[#1f2a1f] bg-black/40 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-[#5c6b5c]">youssef@portfolio: ~</span>
      </div>

      {/* Content with text */}
      <div className="relative z-10 p-6 font-mono text-[#33ff33] opacity-90">
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

