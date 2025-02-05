'use client';

import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { FileText, Check, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { customWorkflows } from '@/lib/data/workflows';

interface LogEntry {
  date: string;
  status: 'Success' | 'Fail';
  triggeredBy: {
    type: 'System' | 'User';
    name: string;
    avatar: string | null;
  };
  activity: string;
  error: string;
}

interface WorkflowLogDialogProps {
  workflow: (typeof customWorkflows)[0] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkflowLogDialog({
  workflow,
  open,
  onOpenChange,
}: WorkflowLogDialogProps) {
  if (!workflow) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5" />
            Workflow Log: {workflow.title}
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
                } as LogEntry,
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
                } as LogEntry,
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
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={log.triggeredBy.avatar || undefined} />
                            <AvatarFallback>
                              {log.triggeredBy.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
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
                    {log.activity === '-' ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal truncate max-w-full justify-start"
                        onClick={() =>
                          (window.location.href = `/activities?type=workflow&activity=${log.activity}`)
                        }
                      >
                        {log.activity}
                      </Button>
                    )}
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
  );
}
