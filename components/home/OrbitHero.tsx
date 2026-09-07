"use client";

import { motion } from "framer-motion";

export function OrbitHero() {
  return (
    <div className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center sm:h-[420px] sm:w-[420px]">
      {/* faint outer glow */}
      <div className="absolute h-56 w-56 rounded-full bg-primary/10 blur-3xl sm:h-72 sm:w-72" />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="heroOrbitGradient" x1="0" y1="200" x2="400" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-accent)" />
            <stop offset="1" stopColor="var(--color-primary)" />
          </linearGradient>
        </defs>

        <motion.g
          style={{ originX: "200px", originY: "200px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="175"
            ry="70"
            stroke="url(#heroOrbitGradient)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.55"
            transform="rotate(-18 200 200)"
          />
          <circle cx="357" cy="112" r="6" fill="var(--color-primary-soft)" />
        </motion.g>

        <motion.g
          style={{ originX: "200px", originY: "200px" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          <ellipse
            cx="200"
            cy="200"
            rx="175"
            ry="70"
            stroke="var(--color-border-light)"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            transform="rotate(18 200 200)"
          />
          <circle cx="46" cy="288" r="4.5" fill="var(--color-accent)" />
        </motion.g>
      </svg>

      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 sm:h-52 sm:w-52"
        style={{
          borderColor: "var(--color-primary)",
          background: "radial-gradient(circle at 50% 40%, var(--color-surface-light), var(--color-background))",
          boxShadow: "0 0 60px -10px var(--color-primary)",
        }}
      >
        <span className="font-mono text-3xl font-medium text-primary sm:text-4xl">{"</>"}</span>
      </motion.div>
    </div>
  );
}
