'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { WorkflowTemplate } from '@/lib/data/workflows';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Check,
  Clock,
  ArrowRight,
  UserPlus,
  UserMinus,
  Cake,
  Gift,
} from 'lucide-react';
import { CreateWorkflowDialog } from '@/components/create-workflow-dialog';

interface WorkflowTemplateCardProps {
  template: WorkflowTemplate;
  index: number;
}

export function WorkflowTemplateCard({
  template,
  index,
}: WorkflowTemplateCardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleUseTemplate = () => {
    setShowDialog(false);
    setShowCreateDialog(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative"
        onClick={() => setShowDialog(true)}
      >
        <Card
          className="group cursor-pointer rounded-3xl transition-all duration-300 hover:shadow-lg relative overflow-hidden h-[280px]"
          style={{
            background:
              template.color === 'bg-purple-100'
                ? '#FAF5FF'
                : template.color === 'bg-blue-100'
                ? '#E0F2FE'
                : template.color === 'bg-green-100'
                ? '#DCFCE7'
                : template.color === 'bg-red-100'
                ? '#FEE2E2'
                : '#F3F4F6',
          }}
        >
          <div className="relative z-10 p-2 flex flex-col h-full">
            <span className="text-3xl mb-6 p-1 pt-3">{template.emoji}</span>

            <div className="mt-auto bg-white rounded-3xl p-4 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-base text-muted-foreground">
                {template.description}
              </p>
              <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground font-medium group-hover:text-primary opacity-100 ">
                View template
                <ArrowRight
                  className={cn(
                    'h-4 w-4 transition-transform duration-300',
                    'group-hover:translate-x-1'
                  )}
                />
              </div>
            </div>
          </div>

          <div
            className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-100',
              'transition-opacity duration-300 pointer-events-none',
              'bg-gradient-to-br from-transparent via-transparent to-black/5'
            )}
          />
        </Card>
      </motion.div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
                  template.color
                )}
              >
                {template.emoji}
              </div>
              <DialogTitle>{template.name}</DialogTitle>
            </div>
            <DialogDescription>{template.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Starts when...</h3>
              <div className="p-4 rounded-lg bg-muted/50 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                  {template.triggerIcon === 'new-hire' && (
                    <UserPlus className="h-4 w-4 text-primary" />
                  )}
                  {template.triggerIcon === 'offboarding' && (
                    <UserMinus className="h-4 w-4 text-primary" />
                  )}
                  {template.triggerIcon === 'birthday' && (
                    <Cake className="h-4 w-4 text-primary" />
                  )}
                  {template.triggerIcon === 'anniversary' && (
                    <Gift className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{template.trigger}</div>
                  <div className="text-sm text-muted-foreground">
                    Creates activity{' '}
                    {template.triggerIcon === 'new-hire'
                      ? '30 days before employees first day'
                      : template.triggerIcon === 'offboarding'
                      ? '14 days before employee last day'
                      : template.triggerIcon === 'birthday'
                      ? 'one week in advance '
                      : 'one week in advance'}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Actions</h3>
              <div className="space-y-3">
                {template.tasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/50 flex items-start gap-3"
                  >
                    <div className="h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-primary/60" />
                    </div>
                    <div className="font-medium">{task}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUseTemplate}>Use template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateWorkflowDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        initialTemplate={template}
        skipTemplateStep
      />
    </>
  );
}
