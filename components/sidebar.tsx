"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ClipboardList,
  CheckSquare,
  Users2,
  Network,
  Settings,
  Bot,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Insights',
    href: '/insights',
    icon: Search,
  },
  {
    name: 'Surveys',
    href: '/surveys',
    icon: ClipboardList,
  },
  {
    name: 'Activity Center',
    href: '/activity-center',
    icon: CheckSquare,
  },
  {
    name: 'Organization',
    href: '/organization',
    icon: Network,
  },
  {
    name: 'Employees',
    href: '/employees',
    icon: Users2,
  },
  {
    name: 'Automations',
    href: '/automations',
    icon: Bot,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-[#2A2B3C] text-white flex-shrink-0">
      <div className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="https://manager.workly.app/logo-white.svg"
            alt="Workly"
            className="h-8 w-auto"
          />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-[#3F415C] text-[#4ECCA3]'
                  : 'text-gray-300 hover:bg-[#3F415C] hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 text-xs text-gray-400">v1.32.0</div>
    </div>
  );
}
