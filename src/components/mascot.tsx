"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function Mascot() {
  const [frame, setFrame] = useState(1);
  const [isBlinking, setIsBlinking] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const blink = () => {
    if (isBlinking) return;
    setIsBlinking(true);
    
    // Blink animation sequence
    setFrame(2);
    setTimeout(() => {
      setFrame(3);
      setTimeout(() => {
        setFrame(2);
        setTimeout(() => {
          setFrame(1);
          setIsBlinking(false);
        }, 50);
      }, 80);
    }, 50);
  };

  useEffect(() => {
    const scheduleBlink = () => {
      timeoutRef.current = setTimeout(() => {
        blink();
        scheduleBlink();
      }, 2000 + Math.random() * 2500);
    };
    
    scheduleBlink();
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="fixed bottom-5 right-5 w-24 h-24 md:w-32 md:h-32 cursor-pointer z-50 animate-bounce-slow"
      onClick={blink}
    >
      <div className="relative w-full h-full drop-shadow-lg">
        {[1, 2, 3].map((f) => (
          <Image
            key={f}
            src={`/Chibi_${f}-removebg-preview.png`}
            alt="Mascot"
            fill
            className={`object-contain transition-opacity duration-50 ${frame === f ? 'opacity-100' : 'opacity-0'}`}
            priority={f === 1}
          />
        ))}
      </div>
    </div>
  );
}
