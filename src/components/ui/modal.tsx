"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  initialPosition?: { x: number; y: number };
}

export function Modal({ isOpen, onClose, title, children, initialPosition = { x: 0, y: 0 } }: ModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            ref={constraintsRef}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              className={cn(
                "pointer-events-auto modal-window",
                isDragging && "cursor-grabbing",
                isClosing && "genie-closing"
              )}
              style={{ 
                background: 'var(--card-bg)',
                borderRadius: '12px',
                boxShadow: '0 22px 70px 4px rgba(0, 0, 0, 0.2)',
                border: '1px solid var(--card-border)',
                minWidth: '300px',
                maxWidth: '450px',
                width: '90%',
                maxHeight: '80vh',
                overflow: 'hidden',
                transformOrigin: 'bottom center',
              }}
              initial={{ scale: 0.8, y: -40, opacity: 0 }}
              animate={{ 
                scale: isClosing ? 0 : 1, 
                y: isClosing ? 800 : initialPosition.y, 
                opacity: isClosing ? 0 : 1,
                scaleX: isClosing ? 0.1 : 1,
                scaleY: isClosing ? 0.1 : 1,
              }}
              transition={isClosing ? {
                duration: 0.5,
                ease: [0.32, 0, 0.67, 0],
                scaleX: { duration: 0.3, delay: 0.1 },
              } : {
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              drag={!isClosing}
              dragConstraints={constraintsRef}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {/* Header */}
              <div 
                className="modal-header flex items-center justify-between px-4 py-3 cursor-grab active:cursor-grabbing"
                style={{
                  background: 'linear-gradient(180deg, var(--icon-bg), var(--card-bg))',
                  borderBottom: '1px solid var(--card-border)'
                }}
              >
                {/* Title */}
                <span 
                  className="flex-1 text-center text-sm font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {title}
                </span>
                
                {/* Close Button - Double Arrow */}
                <button
                  onClick={handleClose}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-[var(--icon-bg)]"
                  style={{ color: 'var(--text-light)' }}
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="7 13 12 18 17 13" />
                    <polyline points="7 6 12 11 17 6" />
                  </svg>
                </button>
              </div>
              
              {/* Body */}
              <div 
                className="modal-content p-6 overflow-y-auto"
                style={{ maxHeight: 'calc(80vh - 48px)' }}
              >
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
