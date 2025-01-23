'use client';

import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Check, User, Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { customWorkflows, WorkflowTask } from '@/lib/data/workflows';

interface WorkflowActionModalProps {
  action: WorkflowTask | null;
  onOpenChange: (open: boolean) => void;
}

export function WorkflowActionModal({ action, onOpenChange }: WorkflowActionModalProps) {
  if (!action) return null;

  return (
    <Dialog open={!!action} onOpenChange={onOpenChange} modal={true}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1001]"
        onClick={() => onOpenChange(false)}
      />
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              {action.type && action.type === 'email' ? (
                <Mail className="h-5 w-5" />
              ) : (
                <Check className="h-5 w-5" />
              )}
            </div>
            <div>
              <DialogTitle>{action.title}</DialogTitle>
              <DialogDescription>
                {action.type === 'email' ? 'Automated email' : 'To-do'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          {action.description && (
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Assignee</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {action.assignee}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Due Date</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {action.dueDate}
              </p>
            </div>
          </div>

          {action.variants && action.variants.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium">Included for</h4>
              </div>
              <div className="flex gap-2">
                {action.variants.map((variant) => (
                  <span
                    key={variant}
                    className={cn(
                      "px-2 py-1 rounded-full text-sm",
                      variant === "Office workers" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    )}
                  >
                    {variant}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}