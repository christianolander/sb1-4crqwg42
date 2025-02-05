'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function AssignmentsTab() {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="relative w-32 h-32 mb-6"
      >
        <div className="absolute inset-0 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-muted-foreground/20">
            <path d="M50 15 L60 35 L80 35 L65 50 L70 70 L50 60 L30 70 L35 50 L20 35 L40 35 Z" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-muted-foreground/40" />
        </div>
      </motion.div>
      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold mb-2"
      >
        No assignments yet 😅!
      </motion.h3>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-center max-w-md"
      >
        When you're assigned to activities or workflows, they'll appear here.
        Take a break and enjoy the calm before the storm! ⛱️
      </motion.p>
    </div>
  );
}
