'use client';

'use client';

import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

export default function SurveysPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Surveys</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage employee surveys
          </p>
        </div>

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
              <ClipboardList className="w-16 h-16 text-muted-foreground/40" />
            </div>
          </motion.div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-semibold mb-2"
          >
            No surveys yet
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-center max-w-md"
          >
            Create your first survey to gather feedback from your team.
            Start by clicking the Create button above! 📝
          </motion.p>
        </div>
      </div>
    </div>
  );
}
