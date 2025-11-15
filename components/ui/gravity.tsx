"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const Gravity = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  type Rocket = {
  horizontal: number;
  verticalUp: number;
  verticalDown: number;
  angleDeg: number;
  duration: number;
  delay: number;
  fallDelay: number;
};

const [rockets, setRockets] = useState<Rocket[]>([]);

  useEffect(() => {
    setMounted(true);
    const generated = new Array(number || 20).fill(true).map((_, idx) => {
      // Stars move across the entire width (much further right)
      const horizontal = 800 + Math.random() * 400; // Increased to reach across section
      const verticalUp = -300 - Math.random() * 200; // How high they go
      const verticalDown = 100 + Math.random() * 100; // How far they fall down
      // Calculate angle for star rotation (pointing in direction of travel)
      const angleDeg = Math.atan2(verticalUp, horizontal) * (180 / Math.PI);
      const duration = 2 + Math.random() * 1.5; // Time to go up
      const fallDuration = 1.5 + Math.random() * 1; // Time to fall down
      const delay = idx * 0.2;
      const fallDelay = duration + delay; // Start falling after going up
      return { horizontal, verticalUp, verticalDown, angleDeg, duration, delay, fallDelay };
    });
    setRockets(generated);
  }, [number]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
    >
      {rockets.map((rocket, idx) => (
        <React.Fragment key={`gravity-${idx}`}>
          {/* Rising phase */}
          <motion.div
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: rocket.horizontal,
              y: rocket.verticalUp,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: rocket.duration,
              delay: rocket.delay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeOut",
            }}
            style={{
              left: '10%',
              bottom: '10px',
              transform: `rotate(${rocket.angleDeg}deg)`,
            }}
          >
            {/* Star Shape */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
              <path 
                d="M12 2 L14.5 9.5 L22 9.5 L16 14.5 L18.5 22 L12 17 L5.5 22 L8 14.5 L2 9.5 L9.5 9.5 Z" 
                fill="#22c55e"
                stroke="#4ade80" 
                strokeWidth="1"
              />
              {/* Glow effect */}
              <path 
                d="M12 2 L14.5 9.5 L22 9.5 L16 14.5 L18.5 22 L12 17 L5.5 22 L8 14.5 L2 9.5 L9.5 9.5 Z" 
                fill="#4ade80"
                opacity="0.4"
              />
            </svg>
          </motion.div>

          {/* Falling phase */}
          <motion.div
            className="absolute"
            initial={{ x: rocket.horizontal, y: rocket.verticalUp, opacity: 0 }}
            animate={{
              x: rocket.horizontal,
              y: rocket.verticalDown,
              opacity: [0, 0.8, 0.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              delay: rocket.fallDelay,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeIn",
            }}
            style={{
              left: '10%',
              bottom: '10px',
            }}
          >
            {/* Star Shape - smaller for falling */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="drop-shadow-md">
              <path 
                d="M12 2 L14.5 9.5 L22 9.5 L16 14.5 L18.5 22 L12 17 L5.5 22 L8 14.5 L2 9.5 L9.5 9.5 Z" 
                fill="#22c55e"
                stroke="#4ade80" 
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
            {/* Trail for falling stars - points downward */}
            <div className="absolute top-full left-1/2 w-[2px] h-8 -translate-x-1/2 bg-gradient-to-b from-green-500 via-green-400 to-transparent opacity-50" />
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
};