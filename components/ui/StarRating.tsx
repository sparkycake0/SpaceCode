"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export function StarRatingDisplay({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? "fill-primary text-primary" : "text-border-light"}
        />
      ))}
    </div>
  );
}

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rate your experience">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        const filled = hovered ? starValue <= hovered : starValue <= value;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === starValue}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(starValue)}
            className="p-1"
          >
            <Star size={26} className={filled ? "fill-primary text-primary" : "text-border-light"} />
          </button>
        );
      })}
    </div>
  );
}
