'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { WorkflowTriggerDialog } from '@/components/workflow-trigger-dialog';
import { WorkflowLogDialog } from '@/components/workflow-log-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  X, 
  FileText, 
  Clock, 
  User,
  AlertCircle, 
  Calendar, 
  UserPlus,
  UserMinus,
  Mail, 
  Check, 
  Trash2, 
  Edit, 
  ExternalLink,
  Play,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { customWorkflows, WorkflowTask } from '@/lib/data/workflows';

interface WorkflowDetailSidebarProps {
  workflow: typeof customWorkflows[0];
  onClose: () => void;
  selectedVariant: string;
  onVariantChange: (value: string) => void;
  onActionClick: (action: WorkflowTask) => void;
}

export function WorkflowDetailSidebar({
  workflow,
  onClose,
  selectedVariant,
  onVariantChange,
  onActionClick,
}: WorkflowDetailSidebarProps) {
  // Check if the workflow has any tasks with variants
  const hasVariants = workflow.tasks.some(task => task.variants && task.variants.length > 0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [showTriggerDialog, setShowTriggerDialog] = useState(false);

  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
        onClick={onClose}
      />
      <motion.div
        key="sidebar"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed top-0 bottom-0 right-0 w-[480px] min-w-[33%] bg-background shadow-[-8px_0_30px_-15px_rgba(0,0,0,0.3)] z-[999]"
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-2xl", workflow.color)}>
                  {workflow.emoji}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{workflow.title}</h2>
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-8rem)] pr-2 -mr-2">
              <div className="space-y-6">
                {/* Status and Metadata */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    {workflow.warning ? (
                      <>
                        <span>{workflow.status}</span>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      </>
                    ) : (
                      <span>{workflow.status}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Created by {workflow.createdBy}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Last run: {workflow.lastTriggered === 'Never' ? 
                      'Never' : 
                      format(new Date(workflow.lastTriggered), 'MMM dd, yyyy HH:mm')}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => {
                      // Handle edit
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => {
                      setShowLogDialog(true);
                    }}
                  >
                    <FileText className="h-4 w-4" />
                    View Log
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setShowTriggerDialog(true)}
                  >
                    <Play className="h-4 w-4" />
                    Run manually
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 relative"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="z-[1000]">
                      {workflow.status === 'Unpublished' ? (
                        <DropdownMenuItem>
                          <Check className="mr-2 h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>
                          <X className="mr-2 h-4 w-4" />
                          Unpublish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => setShowDeleteDialog(true)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium mb-4">Starts when...</h3>
                  <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-3">
                    <div className={cn(
                      "h-8 w-8 rounded-full bg-background flex items-center justify-center",
                      "text-muted-foreground"
                    )}>
                      {workflow.triggerIcon === 'new-hire' ? (
                        <UserPlus className="h-4 w-4" />
                      ) : workflow.triggerIcon === 'offboarding' ? (
                        <UserMinus className="h-4 w-4" />
                      ) : (
                        <Calendar className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate mb-1">
                        {workflow.trigger.split('(')[0].trim()}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs">
                            {workflow.trigger.match(/\((.*?)\)/)?.[1] || ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Actions</h3>
                    {hasVariants && (
                      <Select value={selectedVariant} onValueChange={onVariantChange}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by variant" />
                        </SelectTrigger>
                        <SelectContent className="z-[1001]">
                          <SelectItem value="all">All variants</SelectItem>
                          <SelectItem value="Office workers">Office workers</SelectItem>
                          <SelectItem value="Remote employees">Remote employees</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="space-y-3">
                    {workflow.tasks
                      .filter(task => 
                        selectedVariant === 'all' || 
                        !task.variants || 
                        task.variants.includes(selectedVariant)
                      )
                      .sort((a, b) => (a.orderDate ?? 0) - (b.orderDate ?? 0))
                      .map((task) => (
                        <div
                          key={task.id}
                          onClick={() => onActionClick(task)}
                          className="p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted/70 hover:border-border/40 hover:shadow-sm border border-transparent transition-all duration-200 relative group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "h-8 w-8 rounded-full bg-background flex items-center justify-center shrink-0",
                              task.completed ? "text-green-500" : "text-muted-foreground"
                            )}>
                              {task.type === 'email' ? <Mail className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate mb-1">{task.title}</div>
                              <div className="flex flex-col gap-2">
                                {task.variants && task.variants.length > 0 && (
                                  <div className="flex gap-2">
                                    {task.variants.map((variant) => (
                                      <span
                                        key={variant}
                                        className={cn(
                                          "px-2 py-0.5 rounded-full text-xs",
                                          variant === "Office workers" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                                        )}
                                      >
                                        {variant}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span className="text-xs">{task.assignee}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-xs">{task.dueDate}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bottom padding */}
                <div className="h-8" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Workflow</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this workflow? This will not delete any activities already created by this workflow.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-6">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 0.9, 1.1, 0.9, 1] }}
              transition={{ duration: 0.5 }}
            >
              <Trash2 className="h-12 w-12 text-destructive" />
            </motion.div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                // Handle delete
                setShowDeleteDialog(false);
                onClose();
              }}
            >
              Delete Workflow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <WorkflowLogDialog
        workflow={workflow}
        open={showLogDialog}
        onOpenChange={setShowLogDialog}
      />

      <WorkflowTriggerDialog
        workflow={workflow}
        open={showTriggerDialog}
        onOpenChange={setShowTriggerDialog}
      />
    </>
  );
}
