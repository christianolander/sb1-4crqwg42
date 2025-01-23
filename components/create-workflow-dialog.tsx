'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { workflowTemplates } from '@/lib/data/workflows';
import { Plus } from 'lucide-react';

interface CreateWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTemplate?: (typeof workflowTemplates)[0];
  skipTemplateStep?: boolean;
}

export function CreateWorkflowDialog({
  open,
  onOpenChange,
  initialTemplate,
  skipTemplateStep = false,
}: CreateWorkflowDialogProps) {
  const [step, setStep] = useState<'template' | 'details'>(
    skipTemplateStep ? 'details' : 'template'
  );
  const [selectedTemplate, setSelectedTemplate] = useState<
    (typeof workflowTemplates)[0] | 'blank'
  >(initialTemplate || 'blank');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setStep('template');
    setSelectedTemplate(initialTemplate || 'blank');
    setTitle('');
    setDescription('');
    onOpenChange(false);
  };

  const handleCreate = () => {
    // Handle workflow creation
    console.log({
      template: selectedTemplate,
      title,
      description,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px]">
        <AnimatePresence mode="wait">
          {step === 'template' ? (
            <motion.div
              key="template"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
                <DialogDescription>
                  Start from scratch or use a template to get started quickly
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-4 py-6">
                {/* Blank Template */}
                <Card
                  className={cn(
                    'p-3 cursor-pointer transition-all hover:shadow-md border-2',
                    selectedTemplate === 'blank'
                      ? 'border-[#4ECCA3]'
                      : 'border-transparent hover:border-[#4ECCA3]/20'
                  )}
                  onClick={() => setSelectedTemplate('blank')}
                >
                  <div className="h-16 rounded-lg bg-muted/50 flex items-center justify-center mb-2">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">Blank Workflow</h3>
                  <p className="text-sm text-muted-foreground">
                    Start from scratch and build your own workflow
                  </p>
                </Card>

                {/* Pre-made Templates */}
                {workflowTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={cn(
                      'p-3 cursor-pointer transition-all hover:shadow-md border-2',
                      selectedTemplate === template
                        ? 'border-[#4ECCA3]'
                        : 'border-transparent hover:border-[#4ECCA3]/20'
                    )}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div
                      className={cn(
                        'h-24 rounded-lg flex items-center justify-center mb-2',
                        template.color
                      )}
                    >
                      <span className="text-3xl">{template.emoji}</span>
                    </div>
                    <h3 className="font-medium mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </Card>
                ))}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep('details')}
                  className="bg-[#4ECCA3] hover:bg-[#4ECCA3]/90 text-white"
                >
                  Continue
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DialogHeader>
                <DialogTitle>Name Your Workflow</DialogTitle>
                <DialogDescription>
                  Give your workflow a clear name and description
                </DialogDescription>
              </DialogHeader>

              <div className="py-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    placeholder="e.g., New Employee Onboarding"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description (optional)
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this workflow does..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                {selectedTemplate !== 'blank' && (
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center text-xl',
                          (selectedTemplate as (typeof workflowTemplates)[0])
                            .color
                        )}
                      >
                        {
                          (selectedTemplate as (typeof workflowTemplates)[0])
                            .emoji
                        }
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          Using{' '}
                          {
                            (selectedTemplate as (typeof workflowTemplates)[0])
                              .name
                          }{' '}
                          template
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {
                            (selectedTemplate as (typeof workflowTemplates)[0])
                              .tasks.length
                          }{' '}
                          pre-configured tasks
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => setStep('template')}>
                    Back
                  </Button>
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
                <Button
                  onClick={handleCreate}
                  disabled={!title.trim()}
                  className="bg-[#4ECCA3] hover:bg-[#4ECCA3]/90 text-white"
                >
                  Create Workflow
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
