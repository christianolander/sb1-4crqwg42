'use client';

import dynamic from 'next/dynamic';
import Loading from './loading';

const ActivityCenterClient = dynamic(() => import('@/components/activity-center-client').then(mod => mod.ActivityCenterClient), {
  loading: () => <Loading />,
  ssr: false
});

export default function ActivityCenter() {
  return <ActivityCenterClient />;
}
