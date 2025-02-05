    import { motion } from 'framer-motion';
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Button } from '@/components/ui/button';
    import { Calendar } from '@/components/ui/calendar';
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Mail, Check, User, Calendar as CalendarIcon, Clock, Users, CalendarRange, FileText } from 'lucide-react';
    import { cn } from '@/lib/utils';
    import { format } from 'date-fns';
    import { useState, useMemo } from 'react';

    interface ActivityTaskDialogProps {
      task: {
        id: number;
        title: string;
        description: string;
        dueDate: string;
        completed: boolean;
        assignee: string;
        type: 'task' | 'email';
        recipient?: string;
        subject?: string;
        content?: string;
        sendDate?: string;
      } | null;
      onOpenChange: (open: boolean) => void;
      onSave?: (task: any) => void;
    }

    const employees = [
      { id: 1, name: 'Sarah Miller', role: 'HR Manager', avatar: 'https://i.pravatar.cc/150?u=sarah' },
      { id: 2, name: 'John Davis', role: 'Team Lead', avatar: 'https://i.pravatar.cc/150?u=john' },
      { id: 3, name: 'IT Support', role: 'IT Department', avatar: 'https://i.pravatar.cc/150?u=it' },
      { id: 4, name: 'HR Team', role: 'HR Department', avatar: 'https://i.pravatar.cc/150?u=hr' },
      { id: 5, name: 'Office Admin', role: 'Administration', avatar: 'https://i.pravatar.cc/150?u=admin' },
    ];

    export function ActivityTaskDialog({ task, onOpenChange, onSave }: ActivityTaskDialogProps) {
      if (!task) return null;

      const [title, setTitle] = useState(task.title);
      const [description, setDescription] = useState(task.description);
      const [assignee, setAssignee] = useState(task.assignee);
      const [startDate, setStartDate] = useState<Date | undefined>(task.dueDate ? new Date(task.dueDate) : undefined);
      const [dueDate, setDueDate] = useState<Date | undefined>(task.dueDate ? new Date(task.dueDate) : undefined);
      const [recipient, setRecipient] = useState(task.recipient || '');
      const [subject, setSubject] = useState(task.subject || '');
      const [content, setContent] = useState(task.content || '');
      const [sendDate, setSendDate] = useState<Date | undefined>(task.sendDate ? new Date(task.sendDate) : undefined);
      const [sendTime, setSendTime] = useState<Date | undefined>(task.sendDate ? new Date(task.sendDate) : undefined);


      const hasChanges = useMemo(() => {
        const initialDueDate = task.dueDate ? new Date(task.dueDate) : undefined;
        const initialSendDate = task.sendDate ? new Date(task.sendDate) : undefined;

        const normalizedStartDate = startDate instanceof Date && !isNaN(startDate.getTime()) ? startDate.toISOString() : null;
        const normalizedDueDate = dueDate instanceof Date && !isNaN(dueDate.getTime()) ? dueDate.toISOString() : null;
        const normalizedInitialDueDate = initialDueDate instanceof Date && !isNaN(initialDueDate.getTime()) ? initialDueDate.toISOString() : null;
        const normalizedSendDate = sendDate instanceof Date && !isNaN(sendDate.getTime()) ? sendDate?.toISOString() : null;
        const normalizedInitialSendDate = initialSendDate instanceof Date && !isNaN(initialSendDate.getTime()) ? initialSendDate.toISOString() : null;
        const normalizedSendTime = sendTime instanceof Date && !isNaN(sendTime.getTime()) ? sendTime?.toISOString() : null;
        const normalizedInitialSendTime = initialSendDate instanceof Date && !isNaN(initialSendDate.getTime()) ? new Date(task.sendDate).toISOString() : null;


        return title !== task.title ||
          description !== task.description ||
          assignee !== task.assignee ||
          normalizedStartDate !== normalizedInitialDueDate  ||
          normalizedDueDate !== normalizedInitialDueDate ||
          recipient !== (task.recipient || '') ||
          subject !== (task.subject || '') ||
          content !== (task.content || '') ||
          normalizedSendDate !== normalizedInitialSendDate ||
          normalizedSendTime !== normalizedInitialSendTime;
      }, [title, description, assignee, startDate, dueDate, task, recipient, subject, content, sendDate, sendTime]);


      const handleSave = () => {
        if (onSave) {
          onSave({
            ...task,
            title: task.type === 'email' ? 'Send an automated Email' : title, // Use default title for email tasks
            description,
            assignee,
            dueDate: dueDate?.toISOString(),
            recipient,
            subject,
            content,
            sendDate: sendDate?.toISOString(), // Consider combining date and time if needed
          });
        }
        onOpenChange(false);
      };

      return (
        <Dialog open={!!task} onOpenChange={onOpenChange}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1001]"
            onClick={() => onOpenChange(false)}
          />
          <DialogContent className={cn(
            "sm:max-w-[600px]",
            task.completed && "select-none"
          )}>
            {task.completed && (
              <div className="mb-6 p-3 bg-muted/50 rounded-lg border text-sm text-muted-foreground flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500 shrink-0" />
                <span>This task is completed and cannot be edited. You can still view all the details.</span>
              </div>
            )}

            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {task.type === 'email' ? (
                    <Mail className="h-5 w-5" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <DialogTitle>{task.type === 'email' ? "Send automated email" : task.title}</DialogTitle>
                  <DialogDescription>
                    {task.type === 'email' ? 'Automated email' : 'To-do'}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {task.type !== 'email' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Title
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Task title"
                      disabled={task.completed}
                      className={task.completed ? "opacity-70" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Description
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the task..."
                      rows={3}
                      disabled={task.completed}
                      className={task.completed ? "opacity-70" : ""}
                    />
                  </div>
                </>
              )}


              {task.type === 'email' && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Recipient
                    </label>
                    <Input
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="Recipient email address"
                      disabled={task.completed}
                      className={task.completed ? "opacity-70" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Subject
                    </label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email subject"
                      disabled={task.completed}
                      className={task.completed ? "opacity-70" : ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Content
                    </label>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Email content..."
                      rows={5}
                      disabled={task.completed}
                      className={task.completed ? "opacity-70" : ""}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        Send Date and Time
                      </label>
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal w-[150px]",
                                !sendDate && "text-muted-foreground",
                                task.completed && "opacity-70 cursor-not-allowed"
                              )}
                              disabled={task.completed}
                            >
                              {sendDate ? format(sendDate, 'PPP') : "Send date"}
                            </Button>
                          </PopoverTrigger>
                          {!task.completed && <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={sendDate}
                              onSelect={setSendDate}
                              initialFocus
                            />
                          </PopoverContent>}
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal w-[100px]",
                                !sendTime && "text-muted-foreground",
                                task.completed && "opacity-70 cursor-not-allowed"
                              )}
                              disabled={task.completed}
                            >
                              {sendTime ? format(sendTime, 'HH:mm') : "Time"}
                            </Button>
                          </PopoverTrigger>
                          {!task.completed && <PopoverContent className="w-auto p-0" align="start">
                            {/* Basic time input - consider using a proper time picker library for better UX */}
                            <input
                              type="time"
                              value={sendTime ? format(sendTime, 'HH:mm') : ''}
                              onChange={(e) => {
                                setSendTime(e.target.value ? new Date(`2000-01-01T${e.target.value}:00`) : undefined);
                              }}
                              className="w-full p-2 border rounded"
                            />
                          </PopoverContent>}
                        </Popover>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {task.type !== 'email' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      Scheduled for
                    </label>
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal w-[200px]",
                              !startDate && "text-muted-foreground",
                              task.completed && "opacity-70 cursor-not-allowed"
                            )}
                            disabled={task.completed}
                          >
                            {startDate ? format(startDate, 'PPP') : "Start date"}
                          </Button>
                        </PopoverTrigger>
                        {!task.completed && <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>}
                      </Popover>
                      <span className="text-muted-foreground">→</span>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal w-[200px]",
                              !dueDate && "text-muted-foreground",
                              task.completed && "opacity-70 cursor-not-allowed"
                            )}
                            disabled={task.completed}
                          >
                            {dueDate ? format(dueDate, 'PPP') : "Due date"}
                          </Button>
                        </PopoverTrigger>
                        {!task.completed && <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={dueDate}
                            onSelect={setDueDate}
                            initialFocus
                          />
                        </PopoverContent>}
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Assignee
                    </label>
                    <Select value={assignee} onValueChange={setAssignee} disabled={task.completed}>
                      <SelectTrigger className={task.completed ? "opacity-70" : ""}>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.name}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              {task.completed ? (
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={
                      !hasChanges ||
                      (task.type === 'email'
                        ? (!recipient.trim() || !subject.trim() || !content.trim() || !sendDate || !sendTime)
                        : (!title.trim() || !description.trim() || !assignee || !startDate || !dueDate))
                    }
                    className="bg-[#4ECCA3] hover:bg-[#4ECCA3]/90 text-white"
                  >
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      );
    }
