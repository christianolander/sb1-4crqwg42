'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ActivitiesTab } from '@/components/activities-tab';
import { WorkflowsTab } from '@/components/workflows-tab';
import { AssignmentsTab } from '@/components/assignments-tab';
import { activities } from '@/lib/data/activities';
import Loading from './loading';

type TabValue = 'activities' | 'workflows' | 'assignments';

export default function ActivityCenter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const tab = (searchParams.get('tab') as TabValue) || 'activities';
  const activityId = searchParams.get('activity');

  // Find the activity if an ID is provided in the URL
  const selectedActivity = useMemo(() => {
    if (!activityId) return null;
    return activities.find(a => a.id === parseInt(activityId)) || null;
  }, [activityId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    // Preserve the activity parameter when changing tabs
    if (activityId) {
      params.set('activity', activityId);
    }
    router.push(`/activity-center?${params.toString()}`);
  }, [router, searchParams]);

  const handleActivitySelect = useCallback((activity: typeof activities[0] | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (activity) {
      params.set('activity', activity.id.toString());
    } else {
      params.delete('activity');
    }
    router.push(`/activity-center?${params.toString()}`);
  }, [router, searchParams]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Tabs value={tab} onValueChange={handleTabChange}>
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="flex flex-col">
            <div className="flex h-14 items-center px-4 gap-4">
              <h1 className="text-xl font-semibold">Activity Center</h1>
              <div className="ml-auto flex items-center space-x-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create
                </Button>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5" />
                </Button>
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/150?u=demo" />
                  <AvatarFallback>DM</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="px-4">
              <TabsList className="h-12 w-full justify-start gap-4 bg-transparent p-0">
                <TabsTrigger
                  value="activities"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1"
                >
                  Activities
                </TabsTrigger>
                <TabsTrigger
                  value="workflows"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1"
                >
                  Workflows
                </TabsTrigger>
                <TabsTrigger
                  value="assignments"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-1"
                >
                  My Assignments
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </header>

        <div className="px-4 py-4">
          <TabsContent value="activities">
            <ActivitiesTab 
              selectedActivity={selectedActivity}
              onActivitySelect={handleActivitySelect}
            />
          </TabsContent>

          <TabsContent value="workflows">
            <WorkflowsTab />
          </TabsContent>

          <TabsContent value="assignments">
            <AssignmentsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
