'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { WorkflowTriggerDialog } from '@/components/workflow-trigger-dialog';
import { CreateWorkflowDialog } from '@/components/create-workflow-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { WorkflowTemplateCard } from '@/components/workflow-template-card';
import { WorkflowDetailSidebar } from '@/components/workflow-detail-sidebar';
import { WorkflowActionModal } from '@/components/workflow-action-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import RobotSVG from '@/components/robot-svg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import {
  X,
  Plus,
  AlertCircle,
  Zap,
  Mail,
  Play,
  Edit,
  Gift,
  Clock,
  Users,
  Check,
  Trash2,
  UserPlus,
  Calendar,
  FileText,
  Building2,
  ExternalLink,
  MoreVertical,
  Cake,
  UserMinus,
} from 'lucide-react';
import { customWorkflows, workflowTemplates } from '@/lib/data/workflows';

export function WorkflowsTab() {
  const router = useRouter();
  const [showHero, setShowHero] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<
    (typeof customWorkflows)[0] | null
  >(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] = useState<
    (typeof customWorkflows)[0] | null
  >(null);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<
    (typeof customWorkflows)[0] | null
  >(null);
  const [selectedAction, setSelectedAction] = useState<
    (typeof customWorkflows)[0]['tasks'][0] | null
  >(null);
  const [sortColumn, setSortColumn] = useState('lastTriggered');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showTriggerDialog, setShowTriggerDialog] = useState(false);
  const [workflowToTrigger, setWorkflowToTrigger] = useState<
    (typeof customWorkflows)[0] | null
  >(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('all');

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {showHero && (
        <div className="relative overflow-hidden rounded-lg bg-[#F5F7FA] border-primary/10 border pt-8 pb-8 space-y-2">
          {/* Animated Robot */}
          <div className="relative z-10 flex justify-center">
            <RobotSVG className="w-[80px] h-[140px]" />
          </div>

          <button
            onClick={() => setShowHero(false)}
            className="absolute right-4 top-4 text-primary/40 hover:text-primary/60 transition-colors z-2"
          >
            <X className="h-4 w-4" /> (empty state)
          </button>
          <div className="text-center max-w-2xl mx-auto space-y-4 relative z-2">
            <motion.h1
              className="text-4xl md:text-5xl p-2 font-bold text-primary/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.01, staggerChildren: 0.02 }}
              >
                {Array.from('HR on cruise control ✈️').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-md mb-2"
            >
              Use Workflows to auto-generate Activities, freeing up time for you
              and your team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative pt-4"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#4ECCA3] hover:bg-[#4ECCA3]/90 text-md font-semibold text-white"
                onClick={() => setShowCreateDialog(true)}
              >
                <Zap className="h-4 w-4" />
                Create new workflow
              </Button>
            </motion.div>
          </div>

          {/* Templates Section */}
          <div className="space-y-4 p-6 pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto justify-center relative z-2">
              {workflowTemplates.map((template, index) => (
                <WorkflowTemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Your Workflows Section */}
      <div className="space-y-4 relative">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Your workflows
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New workflow
          </Button>
        </div>
        <div className="rounded-md border relative">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Name</TableHead>
                    <TableHead className="w-[15%]">Status</TableHead>
                    <TableHead
                      className="w-[15%] cursor-pointer hover:text-primary"
                      onClick={() => {
                        if (sortColumn === 'lastEdited') {
                          setSortDirection((prev) =>
                            prev === 'asc' ? 'desc' : 'asc'
                          );
                        } else {
                          setSortColumn('lastEdited');
                          setSortDirection('desc');
                        }
                      }}
                    >
                      Last Edited{' '}
                      {sortColumn === 'lastEdited' && (
                        <span className="ml-2">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </TableHead>
                    <TableHead className="w-[20%]">
                      Ongoing Activities
                    </TableHead>
                    <TableHead
                      className="w-[15%] cursor-pointer hover:text-primary"
                      onClick={() => {
                        if (sortColumn === 'lastTriggered') {
                          setSortDirection((prev) =>
                            prev === 'asc' ? 'desc' : 'asc'
                          );
                        } else {
                          setSortColumn('lastTriggered');
                          setSortDirection('desc');
                        }
                      }}
                    >
                      Last Triggered{' '}
                      {sortColumn === 'lastTriggered' && (
                        <span className="ml-2">
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </TableHead>
                    <TableHead className="w-[5%]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customWorkflows
                    .sort((a, b) => {
                      if (sortColumn === 'lastTriggered') {
                        const aDate =
                          a.lastTriggered === 'Never'
                            ? new Date(0)
                            : new Date(a.lastTriggered);
                        const bDate =
                          b.lastTriggered === 'Never'
                            ? new Date(0)
                            : new Date(b.lastTriggered);
                        return sortDirection === 'asc'
                          ? aDate.getTime() - bDate.getTime()
                          : bDate.getTime() - aDate.getTime();
                      } else if (sortColumn === 'lastEdited') {
                        const aDate = new Date(a.lastEdited);
                        const bDate = new Date(b.lastEdited);
                        return sortDirection === 'asc'
                          ? aDate.getTime() - bDate.getTime()
                          : bDate.getTime() - aDate.getTime();
                      }
                      return 0;
                    })
                    .map((workflow) => (
                      <TableRow
                        key={workflow.id}
                        className="group hover:bg-muted/50"
                        onClick={() => setSelectedWorkflow(workflow)}
                      >
                        <TableCell>
                          <button
                            className="flex items-center gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/activity-center?tab=activities&activity=1`
                              );
                            }}
                          >
                            <div
                              className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center',
                                workflow.color
                              )}
                            >
                              {workflow.emoji}
                            </div>
                            <span className="font-medium">
                              {workflow.title}
                            </span>
                          </button>
                        </TableCell>
                        <TableCell>
                          {workflow.warning ? (
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center gap-2 cursor-help">
                                  <span>{workflow.status}</span>
                                  <AlertCircle className="h-4 w-4 text-amber-500" />
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent className="w-80 p-4">
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
                                    <div>
                                      <p className="font-medium">
                                        {workflow.warning.message}
                                      </p>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        {workflow.warning.details}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="pt-2 flex items-center justify-between border-t">
                                    <span className="text-xs text-muted-foreground">
                                      {format(
                                        new Date(workflow.warning.timestamp),
                                        'MMM dd, yyyy HH:mm'
                                      )}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedLog(workflow);
                                        setShowLogDialog(true);
                                      }}
                                    >
                                      View log
                                    </Button>
                                  </div>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          ) : (
                            <span className="text-muted-foreground">
                              {workflow.status}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(workflow.lastEdited),
                            'MMM dd, yyyy'
                          )}
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <div className="flex items-center gap-2">
                                <span className="border-b border-dotted border-muted-foreground/50">
                                  {
                                    workflow.tasks.filter((t) => !t.completed)
                                      .length
                                  }
                                </span>
                                {workflow.tasks.filter((t) => !t.completed)
                                  .length > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(
                                        `/activity-center?tab=activities`
                                      );
                                    }}
                                    className="text-sm text-primary hover:text-primary/80 transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    Show activities
                                  </button>
                                )}
                              </div>
                            </HoverCardTrigger>
                            <HoverCardContent
                              align="start"
                              className="w-[400px] p-6"
                            >
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">
                                  Ongoing Activities
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Activities created by this workflow
                                </p>
                              </div>
                              <div className="mt-4 space-y-3">
                                {[
                                  {
                                    name: 'Onboarding: Anna Karlsson',
                                    progress: 65,
                                    completed: 2,
                                    total: 6,
                                    created: '2025-06-01',
                                  },
                                  {
                                    name: 'Onboarding: Erik Svensson',
                                    progress: 30,
                                    completed: 1,
                                    total: 6,
                                    created: '2025-06-15',
                                  },
                                ]
                                  .slice(0, 2)
                                  .map((activity, index) => (
                                    <div
                                      key={index}
                                      className="p-4 rounded-lg bg-muted/20 space-y-3 cursor-pointer hover:bg-muted/80 hover:shadow-sm transition-all duration-200 border border-transparent hover:border-border/80"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(
                                          `/activity-center?tab=activities&activity=1`
                                        );
                                      }}
                                    >
                                      <div className="font-medium text-sm">
                                        {activity.name}
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <div className="relative flex-1 h-2">
                                          <Progress
                                            value={activity.progress}
                                            className="h-2 bg-muted [&>div]:bg-[#4ECCA3]"
                                          />
                                        </div>
                                        <span className="text-sm whitespace-nowrap">
                                          {activity.completed}/{activity.total}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full mt-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(
                                      `/activity-center?tab=activities`
                                    );
                                  }}
                                >
                                  Show all activities
                                </Button>
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        </TableCell>
                        <TableCell>
                          {workflow.lastTriggered === 'Never'
                            ? 'Never'
                            : format(
                                new Date(workflow.lastTriggered),
                                'MMM dd, yyyy HH:mm'
                              )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                variant="ghost"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedWorkflow(workflow);
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(
                                    'https://chimerical-crisp-55416d.netlify.app/?template=onboarding',
                                    '_blank'
                                  );
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Workflow
                              </DropdownMenuItem>
                              {workflow.status === 'Unpublished' ? (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle publish
                                  }}
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Publish
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle unpublish
                                  }}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Unpublish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle manual trigger
                                }}
                              >
                                <Play className="mr-2 h-4 w-4" />
                                <div
                                  onClick={() => {
                                    setWorkflowToTrigger(workflow);
                                    setShowTriggerDialog(true);
                                  }}
                                >
                                  Run manually
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedLog(workflow);
                                  setShowLogDialog(true);
                                }}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                View Log
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setWorkflowToDelete(workflow);
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Workflow
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Workflow</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this workflow? This will not
              delete any activities already created by this workflow.
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
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle delete
                setShowDeleteDialog(false);
              }}
            >
              Delete Workflow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateWorkflowDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              Workflow Log: Company Onboarding
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[180px]">Date</TableHead>
                  <TableHead className="w-[200px]">Triggered by</TableHead>
                  <TableHead className="w-[200px]">Created Activity</TableHead>
                  <TableHead className="min-w-[200px] w-full">Errors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    date: '2024-03-20T14:30:00',
                    status: 'Success',
                    triggeredBy: {
                      type: 'System',
                      name: 'Automated Trigger',
                      avatar: null,
                    },
                    activity: 'Onboarding: Mr Wickman',
                    error: '-',
                  },
                  {
                    date: '2024-03-15T09:15:00',
                    status: 'Fail',
                    triggeredBy: {
                      type: 'User',
                      name: 'Sarah Miller',
                      avatar: 'https://i.pravatar.cc/150?u=sarah',
                    },
                    activity: '-',
                    error:
                      'Failed to create activity: SMTP connection timeout. The system will automatically retry in 1 hour. If the issue persists, please check your SMTP configuration and ensure the mail server is accessible.',
                  },
                  {
                    date: '2024-03-10T11:20:00',
                    status: 'Success',
                    triggeredBy: {
                      type: 'System',
                      name: 'Automated Trigger',
                      avatar: null,
                    },
                    activity: 'Onboarding: Tyrion Lannister',
                    error: '-',
                  },
                ].map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge
                        className={cn(
                          'whitespace-nowrap flex items-center gap-1.5 w-fit',
                          log.status === 'Success'
                            ? 'bg-green-50 text-green-700 hover:bg-green-100/80'
                            : 'bg-red-50 text-red-700 hover:bg-red-100/80'
                        )}
                      >
                        {log.status === 'Success' && (
                          <Check className="h-3.5 w-3.5" />
                        )}
                        {log.status === 'Fail' && <X className="h-3.5 w-3.5" />}
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(log.date), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="flex items-center gap-2">
                        {log.triggeredBy.type === 'User' ? (
                          <>
                            <span className="truncate">
                              {log.triggeredBy.name}
                            </span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">System</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal truncate max-w-full justify-start"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/activity-center?tab=activities&activity=1`
                          );
                        }}
                      >
                        {log.activity}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {log.error === '-' ? (
                        <span className="text-muted-foreground">-</span>
                      ) : (
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button
                              variant="link"
                              className="p-0 h-auto font-normal text-destructive hover:text-destructive/90"
                            >
                              {log.error.split(':')[0]}...
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                                <div>
                                  <p className="font-medium text-destructive">
                                    Error Details
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {log.error}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <WorkflowActionModal
        action={selectedAction}
        onOpenChange={(open) => !open && setSelectedAction(null)}
      />

      <WorkflowTriggerDialog
        workflow={workflowToTrigger}
        open={showTriggerDialog}
        onOpenChange={(open) => {
          setShowTriggerDialog(open);
          if (!open) setWorkflowToTrigger(null);
        }}
      />

      {/* Workflow Details Sidebar */}
      <AnimatePresence>
        {selectedWorkflow && (
          <WorkflowDetailSidebar
            workflow={selectedWorkflow}
            onClose={() => setSelectedWorkflow(null)}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
            onActionClick={setSelectedAction}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
