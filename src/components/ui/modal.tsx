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
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            ref={constraintsRef}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              className={cn(
                "pointer-events-auto modal-window",
                isDragging && "cursor-grabbing"
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
                overflow: 'hidden'
              }}
              initial={{ scale: 0.8, y: -40, opacity: 0, x: initialPosition.x }}
              animate={{ 
                scale: 1, 
                y: initialPosition.y, 
                opacity: 1,
                x: initialPosition.x,
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
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setIsDragging(false)}
            >
              {/* macOS-style Header */}
              <div 
                className="modal-header flex items-center px-4 py-3 cursor-grab active:cursor-grabbing"
                style={{
                  background: 'linear-gradient(180deg, var(--icon-bg), var(--card-bg))',
                  borderBottom: '1px solid var(--card-border)'
                }}
              >
                {/* Traffic Lights */}
                <div className="flex gap-2 mr-3">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full transition-all hover:brightness-110"
                    style={{ background: '#ff5f56' }}
                    aria-label="Close"
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: '#ffbd2e' }}
                  />
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: '#27c93f' }}
                  />
                </div>
                
                {/* Title */}
                <span 
                  className="flex-1 text-center text-sm font-semibold mr-12"
                  style={{ color: 'var(--text)' }}
                >
                  {title}
                </span>
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
