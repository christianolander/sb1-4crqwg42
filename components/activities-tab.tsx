'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ActivityDetailSidebar } from '@/components/activity-detail-sidebar';
import { ActivityDetail, getActivities } from '@/lib/data/activities';
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
  activities: ActivityDetail[];
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

export function ActivitiesTab({ activities, selectedActivity, onActivitySelect }: ActivitiesTabProps) {
  const searchParams = useSearchParams();

  return (
    <div className="space-y-6 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Stakeholders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow 
                key={activity.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onActivitySelect(activity)}
              >
                <TableCell className="font-medium">{activity.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {activity.type === 'Workflow' ? (
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    {activity.type}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    activity.status === 'Completed' ? 'default' :
                    activity.status === 'In progress' ? 'secondary' : 'outline'
                  }>
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={activity.progress} className="w-[60px]" />
                    <span className="text-muted-foreground text-sm">
                      {activity.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {activity.stakeholders.map((stakeholder, index) => (
                      <Avatar key={index} className="border-2 border-background h-8 w-8">
                        <AvatarImage src={stakeholder.image} />
                        <AvatarFallback>
                          {stakeholder.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
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