'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ActivityDetailSidebar } from '@/components/activity-detail-sidebar';
import { activities, ActivityDetail } from '@/lib/data/activities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Building2, AlertCircle, Users, Activity, CheckCircle2, PieChart, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ActivitiesTabProps {
  selectedActivity: ActivityDetail | null;
  onActivitySelect: (activity: ActivityDetail | null) => void;
}

const stats = [
  {
    title: 'Ongoing',
    value: 8,
    icon: Activity,
    color: 'text-blue-500',
  },
  {
    title: 'Completed',
    value: 24,
    icon: CheckCircle2,
    color: 'text-green-500',
  },
  {
    title: 'Completion Rate',
    value: 75,
    icon: PieChart,
    color: 'text-purple-500',
  },
  {
    title: 'Avg. Duration',
    value: '14d',
    icon: BarChart3,
    color: 'text-orange-500',
  },
];

export function ActivitiesTab({ selectedActivity, onActivitySelect }: ActivitiesTabProps) {
  const searchParams = useSearchParams();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {typeof stat.value === 'number'
                    ? stat.value
                    : stat.value}
                  {stat.title === 'Completion Rate' && '%'}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="gap-2">
          <Building2 className="h-4 w-4" />
          Organization
        </Button>
        <Button variant="outline" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          Status
        </Button>
        <Button variant="outline" className="gap-2">
          <Users className="h-4 w-4" />
          Employee
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stakeholders</TableHead>
              <TableHead>Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow
                key={activity.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onActivitySelect(activity)}
              >
                <TableCell className="font-medium">
                  {activity.name}
                </TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      activity.status === 'In progress'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {activity.stakeholders.map((stakeholder, index) => (
                      <Avatar key={index} className="border-2 border-background">
                        <AvatarImage src={stakeholder.image} />
                        <AvatarFallback>
                          {stakeholder.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-[100px]">
                    <Progress value={activity.progress} className="h-2 animate-in" />
                    <span className="text-xs text-muted-foreground mt-1">
                      {activity.progress}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedActivity && (
        <ActivityDetailSidebar
          activity={selectedActivity}
          onClose={() => onActivitySelect(null)}
        />
      )}
    </div>
  );
}
