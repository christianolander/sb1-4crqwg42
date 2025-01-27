import { customWorkflows } from './workflows';

export type ActivityStatus = 'In progress' | 'Planning' | 'Completed';

export type ActivityDetail = {
  id: number;
  name: string;
  type: string;
  status: ActivityStatus;
  progress: number;
  description: string;
  stakeholders: {
    name: string;
    role: string;
    image: string;
  }[];
  workflowId?: number;
  dueDate?: string;
  createdAt: string;
  tasks: {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    assignee: string;
    type: 'task' | 'email';
  }[];
};

export const activities: ActivityDetail[] = [
  {
    id: 1,
    name: "Onboarding: Karl Karlsson",
    type: "Workflow",
    status: "In progress",
    progress: 25,
    description: "New employee onboarding process for Karl Karlsson, starting April 1st, 2024",
    stakeholders: [
      { name: "John Davis", role: "HR Manager", image: "https://i.pravatar.cc/150?u=1" },
      { name: "Sarah Miller", role: "Team Lead", image: "https://i.pravatar.cc/150?u=2" }
    ],
    workflowId: 1,
    dueDate: "2024-04-01",
    createdAt: "2024-03-15T09:00:00",
    tasks: [
      {
        id: 1,
        title: "Send welcome email",
        description: "Send personalized welcome email with first day instructions",
        dueDate: "2024-03-25",
        completed: true,
        assignee: "System",
        type: "email"
      },
      {
        id: 2,
        title: "Prepare workstation",
        description: "Set up computer, access cards, and required software",
        dueDate: "2024-03-30",
        completed: false,
        assignee: "IT Support",
        type: "task"
      },
      {
        id: 3,
        title: "Schedule orientation",
        description: "Book introduction meetings with key team members",
        dueDate: "2024-04-01",
        completed: false,
        assignee: "Sarah Miller",
        type: "task"
      }
    ]
  },
  {
    id: 2,
    name: "Handlingsplan: Dialog",
    type: "OSA handlingsplan",
    status: "In progress",
    progress: 20,
    description: "Action plan following the annual work environment survey",
    stakeholders: [
      { name: "Sarah Miller", role: "HR Manager", image: "https://i.pravatar.cc/150?u=2" }
    ],
    createdAt: "2024-03-10T14:30:00",
    tasks: [
      {
        id: 1,
        title: "Review survey results",
        description: "Analyze feedback and identify key areas for improvement",
        dueDate: "2024-03-20",
        completed: true,
        assignee: "Sarah Miller",
        type: "task"
      },
      {
        id: 2,
        title: "Schedule team meeting",
        description: "Discuss findings with the team",
        dueDate: "2024-03-25",
        completed: false,
        assignee: "Sarah Miller",
        type: "task"
      }
    ]
  }
];

export async function getActivities(): Promise<ActivityDetail[]> {
  return activities;
}

export async function getActivityById(id: number): Promise<ActivityDetail | null> {
  return activities.find(a => a.id === id) || null;
}