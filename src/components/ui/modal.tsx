"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  zIndex: number;
  onFocus: () => void;
}

export function Modal({ isOpen, onClose, title, children, zIndex, onFocus }: ModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setPosition({ x: 0, y: 0 });
      setHasDragged(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={constraintsRef}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          style={{ zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className={cn(
              "pointer-events-auto w-full max-w-md bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800",
              isDragging && "cursor-grabbing"
            )}
            initial={{ scale: 0.8, y: -40, opacity: 0 }}
            animate={{ 
              scale: 1, 
              y: 0, 
              opacity: 1,
              x: position.x,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            exit={{ 
              scale: 0,
              y: "100vh",
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.6, 0.1]
              }
            }}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragStart={() => {
              setIsDragging(true);
              setHasDragged(true);
            }}
            onDragEnd={() => setIsDragging(false)}
            onMouseDown={onFocus}
          >
            {/* Header */}
            <div className="bg-zinc-100/80 dark:bg-zinc-800/80 px-4 py-3 flex items-center justify-center relative cursor-grab active:cursor-grabbing border-b border-zinc-200 dark:border-zinc-700">
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                {title}
              </span>
              <button
                onClick={onClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-colors"
              >
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
