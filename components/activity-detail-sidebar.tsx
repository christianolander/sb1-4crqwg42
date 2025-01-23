'use client';

import React, { useState } from 'react'; 
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ActivityDetail, ActivityStatus } from '@/lib/data/activities';
import { ActivityTaskDialog } from '@/components/activity-task-dialog';
import { 
  X, 
  Clock,
  FileText,
  Users,
  Mail,
  CheckSquare,
  AlertCircle,
  ChevronDown,
  MessageSquare,
  Send,
  CheckCircle2,
  Edit
} from 'lucide-react';

interface ActivityDetailSidebarProps {
  activity: ActivityDetail;
  onClose: () => void;
}

const demoComments = [
  {
    id: 1,
    author: {
      name: 'Sarah Miller',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    content: "I have scheduled the welcome meeting for next Tuesday at 10 AM.",
    timestamp: '2024-03-20T10:30:00'
  },
  {
    id: 2,
    author: {
      name: 'John Davis',
      avatar: 'https://i.pravatar.cc/150?u=john'
    },
    content: 'IT equipment has been ordered and will arrive next week.',
    timestamp: '2024-03-19T15:45:00'
  }
];

export function ActivityDetailSidebar({ activity, onClose }: ActivityDetailSidebarProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(demoComments);
  const [selectedTask, setSelectedTask] = useState<(typeof tasks)[0] | null>(null);
  const [tasks, setTasks] = useState(activity.tasks);
  const [status, setStatus] = useState<ActivityStatus>(activity.status);
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  const handleTaskToggle = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        author: {
          name: 'You',
          avatar: 'https://i.pravatar.cc/150?u=you'
        },
        content: newComment,
        timestamp: new Date().toISOString()
      }
    ]);
    setNewComment('');
  };

  const handleTaskSave = (updatedTask: typeof tasks[0]) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[998]"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="fixed top-0 bottom-0 right-0 w-[600px] bg-background shadow-lg z-[999] overflow-hidden"
      >
        <div className="h-full flex flex-col">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">{activity.name}</h2>
                <p className="text-muted-foreground mt-1">{activity.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Status and Metadata */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  <div className="flex items-center gap-1">
                    <span>{status}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Type: {activity.type}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Created: {format(new Date(activity.createdAt), 'MMM dd, yyyy HH:mm')}
                </div>
              </div>

              {/* Stakeholders */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Stakeholders</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="space-y-2">
                    {activity.stakeholders.map((stakeholder, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={stakeholder.image} />
                          <AvatarFallback>
                            {stakeholder.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{stakeholder.name}</div>
                          <div className="text-sm text-muted-foreground">{stakeholder.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Tasks */}
              <div className="border-t my-6" />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4" />
                    <span>Actions</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  {/* Progress Bar */}
                  <div className="mb-4 space-y-2">
                    <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#4ECCA3] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {(() => {
                        if (progress === 0) return "Let's get started! 🚀";
                        if (progress < 25) return "Great start! Keep going! 💪";
                        if (progress < 50) return "Making good progress! 🌟";
                        if (progress < 75) return "Almost there! You're doing great! 🎯";
                        if (progress < 100) return "So close to the finish line! 🏃‍♂️";
                        return "All done! Amazing work! 🎉";
                      })()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="group p-4 rounded-lg border transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            checked={task.completed}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            onCheckedChange={() => handleTaskToggle(task.id)}
                            className={cn(
                              "mt-1 transition-colors",
                              task.completed && "border-green-500 bg-green-500/10 data-[state=checked]:bg-green-500 data-[state=checked]:text-white"
                            )}
                          />
                          <div className="space-y-1 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium group-hover:underline">{task.title}</span>
                                  <Edit className="h-3.5 w-3.5 text-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="text-sm text-muted-foreground">{task.description}</div>
                              </div>
                              {task.type === 'email' ? (
                                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                              ) : (
                                <CheckSquare className="h-4 w-4 text-muted-foreground shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{task.assignee}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Comments */}
              <div className="border-t my-6" />
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between py-2 font-medium">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comments</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback>
                            {comment.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{comment.author.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(comment.timestamp), 'MMM dd, HH:mm')}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px]"
                      />
                      <Button
                        size="icon"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </motion.div>

      <ActivityTaskDialog
        task={selectedTask}
        onOpenChange={(open) => !open && setSelectedTask(null)}
        onSave={handleTaskSave}
      />
    </>
  );
}