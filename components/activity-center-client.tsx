'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, HelpCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ActivitiesTab } from '@/components/activities-tab';
import { WorkflowsTab } from '@/components/workflows-tab';
import { AssignmentsTab } from '@/components/assignments-tab';
import { ActivityDetail, getActivities } from '@/lib/data/activities';
import Loading from '@/app/activity-center/loading';

type TabValue = 'activities' | 'workflows' | 'assignments';

export function ActivityCenterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityDetail[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDetail | null>(null);
  const tab = (searchParams.get('tab') as TabValue) || 'activities';

  useEffect(() => {
    const activityId = searchParams.get('activity');
    getActivities().then(data => {
      setActivities(data);
      if (activityId) {
        const activity = data.find(a => a.id === parseInt(activityId));
        setSelectedActivity(activity || null);
      }
      setLoading(false);
    });
  }, [searchParams]);

  const handleTabChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    // Preserve the activity parameter when changing tabs
    if (selectedActivity) {
      params.set('activity', selectedActivity.id.toString());
    }
    router.push(`/activity-center?${params.toString()}`);
  }, [router, searchParams, selectedActivity]);

  const handleActivitySelect = useCallback((activity: ActivityDetail | null) => {
    setSelectedActivity(activity);
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

        <TabsContent value="activities" className="m-0">
          <ActivitiesTab 
            activities={activities}
            selectedActivity={selectedActivity} 
            onActivitySelect={handleActivitySelect} 
          />
        </TabsContent>
        <TabsContent value="workflows" className="m-0">
          <WorkflowsTab />
        </TabsContent>
        <TabsContent value="assignments" className="m-0">
          <AssignmentsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
