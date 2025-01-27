'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  CalendarIcon,
  Calendar as CalendarIcon2,
  Play,
  User,
} from 'lucide-react';
import { customWorkflows, Workflow } from '@/lib/data/workflows';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WorkflowTriggerDialogProps {
  workflow: Workflow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock employees data
const employees = [
  {
    id: 1,
    name: 'Sarah Miller',
    email: 'sarah.miller@company.com',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 2,
    name: 'John Davis',
    email: 'john.davis@company.com',
    avatar: 'https://i.pravatar.cc/150?u=john',
  },
  {
    id: 3,
    name: 'Emma Wilson',
    email: 'emma.wilson@company.com',
    avatar: 'https://i.pravatar.cc/150?u=emma',
  },
  {
    id: 4,
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    avatar: 'https://i.pravatar.cc/150?u=michael',
  },
];

export function WorkflowTriggerDialog({
  workflow,
  open,
  onOpenChange,
}: WorkflowTriggerDialogProps) {
  const [date, setDate] = useState<Date>();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');

  if (!workflow) return null;

  const needsEmployee =
    workflow.triggerIcon === 'new-hire' ||
    workflow.triggerIcon === 'offboarding';
  const isOffboarding = workflow.triggerIcon === 'offboarding';
  const formattedDate = date ? format(date, 'PPP') : undefined;
  const selectedEmployee = employees.find(
    (e) => e.id.toString() === selectedEmployeeId
  );

  const handleTrigger = () => {
    // Handle workflow trigger
    console.log({
      workflow,
      date,
      employee: selectedEmployee,
    });
    onOpenChange(false);
  };

  const isValid = date && (!needsEmployee || selectedEmployee);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
                workflow.color
              )}
            >
              {workflow.emoji}
            </div>
            <div>
              <DialogTitle>Trigger Workflow</DialogTitle>
              <DialogDescription>{workflow.title}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {needsEmployee && (
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Employee
              </label>
              <Select
                value={selectedEmployeeId}
                onValueChange={setSelectedEmployeeId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem
                      key={employee.id}
                      value={employee.id.toString()}
                      className="p-0"
                    >
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>
                            {employee.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col text-left">
                          <span>{employee.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {employee.email}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <CalendarIcon2 className="h-4 w-4" />
              {needsEmployee
                ? selectedEmployee
                  ? isOffboarding
                    ? `${selectedEmployee.name.split(' ')[0]}'s last day`
                    : `${selectedEmployee.name.split(' ')[0]}'s first day`
                  : isOffboarding
                  ? "Employee's end date"
                  : "Employee's start date"
                : 'Trigger Date'}
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formattedDate || 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {needsEmployee && (
            <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
              <p>
                This will create a new activity for{' '}
                {selectedEmployee?.name || '[employee]'} that has{' '}
                {workflow.triggerIcon === 'new-hire'
                  ? 'first day on the job'
                  : 'last day'}{' '}
                {formattedDate || '[date]'}.
              </p>
            </div>
          )}

          {!needsEmployee && workflow.triggerIcon !== 'offboarding' && (
            <div className="rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
              <p>Starting this workflow manually will run it once.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleTrigger}
            disabled={!isValid}
            className="bg-[#4ECCA3] hover:bg-[#4ECCA3]/90 text-white"
            size="sm"
          >
            <Play className="mr-2 h-4 w-4" />
            Run
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
