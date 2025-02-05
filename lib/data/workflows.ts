import {
  Gift,
  UserPlus,
  Mail,
  Calendar,
  Users,
  Building2,
  FileText,
  CheckCircle2,
  UserMinus,
} from 'lucide-react';

export type TriggerIcon =
  | 'new-hire'
  | 'offboarding'
  | 'date'
  | 'birthday'
  | 'anniversary'
  | string;

export type Workflow = {
  id: number;
  title: string;
  description: string;
  lastEdited: string;
  emoji: string;
  color: string;
  trigger: string;
  triggerIcon: TriggerIcon;
  status: string;
  createdBy: string;
  lastTriggered: string;
  nextRun: string;
  tasks: WorkflowTask[];
  warning?: {
    message: string;
    details: string;
    timestamp: string;
  };
};

export type WorkflowTask = {
  id: number;
  type?: 'email' | 'task' | string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
  orderDate: number;
  variants?: string[];
  icon?: any;
};

export const customWorkflows: Workflow[] = [
  {
    id: 1,
    title: 'Company Onboarding',
    description: 'Streamlined employee onboarding process for 2025',
    lastEdited: '2024-03-20T14:30:00',
    emoji: '🎯',
    color: 'bg-green-100 text-green-700',
    trigger: 'New employee (14 days before start date)',
    triggerIcon: 'new-hire',
    status: 'Published',
    createdBy: 'Sarah Miller',
    lastTriggered: '2024-03-15',
    nextRun: '2024-04-01',
    tasks: [
      {
        id: 1,
        type: 'email',
        title: 'Send an automated email',
        description:
          'Send a personalized welcome email with first day instructions and important links',
        assignee: 'System',
        dueDate: '5 days before start date',
        completed: false,
        orderDate: -5,
      },
      {
        id: 2,
        type: 'task',
        title: '🎁 Prepare welcome package',
        description:
          'Assemble welcome kit with company swag, office supplies, and welcome letter',
        assignee: 'HR Team',
        dueDate: 'on first day',
        completed: false,
        orderDate: 0,
      },
      {
        id: 3,
        type: 'task',
        title: '💻 Set up workstation',
        description: 'Configure computer, access cards, and required software',
        assignee: 'IT Support',
        dueDate: '1 day before start date',
        completed: false,
        variants: ['Office workers'],
        orderDate: -1,
      },
      {
        id: 4,
        type: 'task',
        title: '📅 Schedule orientation',
        description:
          'Book introduction meetings with key team members and stakeholders',
        assignee: 'Team Lead',
        dueDate: 'on first day',
        completed: false,
        orderDate: 0,
      },
      {
        id: 5,
        type: 'task',
        title: '👥 Assign mentor',
        description:
          'Select and brief an experienced team member to guide the new employee',
        assignee: 'Department Head',
        dueDate: 'on first day',
        completed: false,
        orderDate: 0,
      },
      {
        id: 6,
        type: 'task',
        title: '🖥️ Ship remote work equipment',
        description:
          'Prepare and ship laptop, monitors, and other necessary equipment',
        assignee: 'IT Support',
        dueDate: '7 days before start date',
        completed: false,
        variants: ['Remote'],
        orderDate: -7,
      },
    ],
  },
  {
    id: 2,
    title: 'Yearly Leadership Training Q3',
    description: 'Quarterly leadership development program',
    lastEdited: '2024-03-18T09:15:00',
    emoji: '📚',
    color: 'bg-blue-100 text-blue-700',
    trigger: 'Scheduled date (August 15, 2024, occurs yearly)',
    triggerIcon: 'date',
    status: 'Unpublished',
    createdBy: 'John Davis',
    lastTriggered: 'Never',
    nextRun: '2024-07-01',
    tasks: [
      {
        id: 1,
        type: 'email',
        title: '📧 Training Program Details',
        description: '',
        assignee: 'System',
        dueDate: 'Days 1-14',
        orderDate: 1,
        completed: false,
      },
      {
        id: 2,
        type: 'task',
        title: '🏢 Book training venue',
        assignee: 'Office Admin',
        dueDate: 'Starts day 12',
        description: '',
        orderDate: 12,
        completed: false,
      },
      {
        id: 3,
        type: 'task',
        title: '📚 Prepare materials',
        assignee: 'L&D Team',
        dueDate: 'Due day 18',
        description: '',
        orderDate: 18,
        completed: false,
      },
    ],
  },

  {
    id: 4,
    title: 'Employee Reviews',
    description: 'Yearly performance review workflow',
    lastEdited: '2024-03-12T11:20:00',
    emoji: '📋',
    color: 'bg-orange-100 text-orange-700',
    trigger: 'Scheduled date (July 1, 2024, occurs yearly)',
    status: 'Published',
    createdBy: 'Lisa Wong',
    lastTriggered: '2024-02-28',
    nextRun: '2024-04-15',
    triggerIcon: 'date',
    tasks: [
      {
        id: 1,
        title: 'Send an automated email',
        assignee: 'System',
        dueDate: 'Day 14',
        description: '',
        completed: false,
        icon: Mail,
        orderDate: 14,
        type: 'email',
      },
      {
        id: 2,
        title: 'Send self-assessment forms',
        assignee: 'HR Team',
        dueDate: 'Day 10-11',
        completed: false,
        icon: FileText,
        orderDate: 10,
        type: 'task',
        description: '',
      },
      {
        id: 3,
        title: 'Collect peer reviews',
        assignee: 'Team Lead',
        dueDate: 'Day 7',
        completed: false,
        icon: Users,
        orderDate: 7,
        description: '',
        type: 'task',
      },
      {
        id: 4,
        title: 'Schedule review meetings',
        assignee: 'Department Head',
        dueDate: 'Day 2-5',
        completed: false,
        icon: Calendar,
        orderDate: 2,
        type: 'task',
        description: '',
      },
    ],
  },

  {
    id: 6,
    title: 'Employee Offboarding',
    description: 'Streamlined employee offboarding process',
    lastEdited: '2024-03-21T10:00:00',
    emoji: '👋',
    color: 'bg-red-100 text-red-700',
    trigger: 'Employee is leaving (14 days before last day)',
    triggerIcon: 'offboarding',
    status: 'Published',
    createdBy: 'Sarah Miller',
    lastTriggered: '2024-03-15',
    nextRun: '2024-04-01',
    tasks: [
      {
        id: 1,
        type: 'email',
        title: 'Send exit information',
        description: 'Send information about exit procedures and final steps',
        assignee: 'System',
        dueDate: 'on last day',
        completed: false,
        orderDate: 0,
      },
      {
        id: 2,
        type: 'task',
        title: 'Schedule exit interview',
        description: 'Book final interview with HR',
        assignee: 'HR Team',
        dueDate: '1 day before last day',
        completed: false,
        orderDate: -7,
      },
      {
        id: 3,
        type: 'task',
        title: 'Revoke system access',
        description: 'Remove access to all company systems and tools',
        assignee: 'IT Support',
        dueDate: 'on last day',
        completed: false,
        orderDate: 0,
      },
      {
        id: 4,
        type: 'task',
        title: 'Collect company assets',
        description:
          'Retrieve laptop, access cards, and other company property',
        assignee: 'Office Admin',
        dueDate: 'on last day',
        completed: false,
        orderDate: 0,
      },
      {
        id: 5,
        type: 'task',
        title: 'Process final payroll',
        description: 'Calculate and process final salary and benefits',
        assignee: 'Finance Team',
        dueDate: '2-5 days after last day',
        completed: false,
        orderDate: 5,
      },
    ],
  },
];

export type WorkflowTemplate = {
  id: number; // Unique identifier for the workflow
  name: string; // Name of the workflow
  description: string; // Brief description of the workflow
  emoji: string; // Emoji representing the workflow
  color: string; // Tailwind color class for styling
  trigger: string; // Description of the event that triggers the workflow
  triggerIcon: TriggerIcon; // Specific trigger icons with controlled values
  tasks: string[]; // List of task descriptions
};

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 1,
    name: 'Onboarding',
    description: 'Give new employees the best start!',
    emoji: '👋',
    color: 'bg-green-100',
    trigger: 'New employee',
    triggerIcon: 'new-hire',
    tasks: [
      '💻 Prepare workstation and equipment',
      '📧 Set up email and system accounts',
      '🤝 Schedule welcome meetings with team',
      '👥 Assign onboarding buddy',
      '📚 Review company policies',
      '💰 Set up payroll and benefits',
    ],
  },
  {
    id: 2,
    name: 'Anniversaries',
    description: 'Celebrate employee milestones',
    emoji: '🎉',
    color: 'bg-purple-100',
    trigger: 'Employee anniversary',
    triggerIcon: 'anniversary',
    tasks: [
      '✨ Send anniversary congratulations',
      '🎁 Prepare anniversary gift',
      '🍽️ Schedule celebration lunch',
      '📢 Share milestone announcement',
      '📈 Review career development',
    ],
  },
  {
    id: 3,
    name: 'Birthdays',
    description: "Never miss a team member's birthday",
    emoji: '🎂',
    color: 'bg-blue-100',
    trigger: 'Employee birthday',
    triggerIcon: 'birthday',
    tasks: [
      'Send birthday wishes',
      'Arrange team celebration',
      'Prepare birthday card',
      'Order birthday cake',
    ],
  },

  {
    id: 5,
    name: 'Offboarding',
    description: 'Ensure smooth employee departures',
    emoji: '👋',
    color: 'bg-red-100',
    trigger: 'Employee exit',
    triggerIcon: 'offboarding',
    tasks: [
      'Exit interview scheduling',
      'Collect company assets',
      'Revoke system access',
      'Process final payroll',
      'Transfer knowledge documentation',
      'Update team documentation',
    ],
  },
];
