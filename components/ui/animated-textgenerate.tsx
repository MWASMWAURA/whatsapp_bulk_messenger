"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextGenerateProps {
  text: string;
  className?: string;
  textClassName?: string;
  blurEffect?: boolean;
  speed?: number;
  highlightWords?: string[];
  highlightClassName?: string;
  linkWords?: string[];
  linkHrefs?: string[];
  linkClassNames?: string[];
}

export const AnimatedTextGenerate: React.FC<AnimatedTextGenerateProps> = ({
  text,
  className,
  textClassName,
  blurEffect = false,
  speed = 0.05,
  highlightWords = [],
  highlightClassName = "text-blue-500",
  linkWords = [],
  linkHrefs = [],
  linkClassNames = [],
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed * 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  const renderText = () => {
    const words = displayText.split(" ");
    const fullWords = text.split(" ");

    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,!?;:]$/, "");
      const punctuation = word.match(/[.,!?;:]$/)?.[0] || "";

      // Check if this word should be highlighted
      const isHighlighted = highlightWords.some(hw =>
        cleanWord.toLowerCase().includes(hw.toLowerCase())
      );

      // Check if this word should be a link
      const linkIndex = linkWords.findIndex(lw =>
        cleanWord.toLowerCase().includes(lw.toLowerCase())
      );
      const isLink = linkIndex !== -1;

      let wordElement = (
        <span
          key={index}
          className={cn(
            isHighlighted && highlightClassName,
            isLink && linkClassNames[linkIndex]
          )}
          onClick={isLink ? () => window.open(linkHrefs[linkIndex], '_blank') : undefined}
        >
          {cleanWord}{punctuation}
        </span>
      );

      // Add blur effect to incomplete words
      if (blurEffect && index === words.length - 1 && currentIndex < text.length) {
        const nextWord = fullWords[index];
        if (nextWord && cleanWord !== nextWord.replace(/[.,!?;:]$/, "")) {
          wordElement = (
            <span key={index} className="blur-sm animate-pulse">
              {wordElement}
            </span>
          );
        }
      }

      return (
        <React.Fragment key={index}>
          {wordElement}
          {index < words.length - 1 && " "}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={cn("inline-block", className)}>
      <div className={cn("whitespace-pre-wrap", textClassName)}>
        {renderText()}
        {currentIndex < text.length && (
          <span className="animate-pulse text-green-500">|</span>
        )}
      </div>
    </div>
  );
};