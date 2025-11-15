"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface StatItem {
  id?: number;
  value: number;
  suffix?: string;
  label: string;
}

function StatsCarousel({
  value,
  suffix,
  trigger,
  onDone,
}: {
  value: number;
  suffix?: string;
  trigger: number;
  onDone?: () => void;
}) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 50,
    mass: 1,
  });

  const rounded = useTransform(springValue, (latest) =>
    Number(latest.toFixed(value % 1 === 0 ? 0 : 1))
  );

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    motionValue.set(0);
    let animationComplete = false;

    const unsub = rounded.on("change", (v) => {
      setDisplayValue(v);
      if (v >= value && !animationComplete) {
        animationComplete = true;
        onDone?.();
      }
    });

    const timeout = setTimeout(() => {
      motionValue.set(value);
    }, 100);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, [trigger, value, motionValue, rounded, onDone]);

  return (
    <div className="text-5xl font-extrabold text-green-600">
      {displayValue}
      {suffix}
    </div>
  );
}

export default function StatsCarouselCount({
  stats,
  title,
  className = "",
  cardClassName = "",
  animation,
}: {
  stats?: StatItem[];
  title?: string;
  className?: string;
  cardClassName?: string;
  animation?: "drag";
}) {
  const defaultStats: StatItem[] = [
    { value: 50, suffix: "+", label: "Components" },
    { value: 12, suffix: "K+", label: "Developers" },
    { value: 99, suffix: "%", label: "Performance" },
  ];

  const initialStats = (stats ?? defaultStats).map((s, i) => ({
    ...s,
    id: i + 1,
  }));

  const [items, setItems] = useState(initialStats);
  const [triggerCounter, setTriggerCounter] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const isDragMode = animation === "drag";

  // Auto-rotate cards every 3 seconds
  useEffect(() => {
    if (isDragMode) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
      setTriggerCounter((t) => t + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragMode, items.length]);

  useEffect(() => {
    setTriggerCounter((t) => t + 1);
  }, []);

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wider text-center">
        {title ?? "Platform Performance"}
      </h3>
      
      <div className="relative h-48 flex items-center justify-center">
        {items.map((stat, idx) => {
          const offset = idx - currentIndex;
          const isActive = offset === 0;
          
          return (
            <motion.div
              key={stat.id}
              className="absolute w-full max-w-xs"
              animate={{
                y: offset * 50,
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.4,
                zIndex: isActive ? 10 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={`bg-white rounded-2xl border-2 border-green-200 p-8 shadow-lg ${cardClassName}`}>
                {isActive ? (
                  <StatsCarousel
                    value={stat.value}
                    suffix={stat.suffix}
                    trigger={triggerCounter}
                  />
                ) : (
                  <div className="text-5xl font-extrabold text-green-600">
                    {stat.value}
                    {stat.suffix}
                  </div>
                )}
                <p className="text-sm text-gray-600 uppercase tracking-wide mt-2">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}