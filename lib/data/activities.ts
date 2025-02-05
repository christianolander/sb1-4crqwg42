    import { customWorkflows } from './workflows';

    export type ActivityStatus = 'In progress' | 'Planning' | 'Completed';


    export type Task = {
      id: number;
      title: string;
      description: string;
      dueDate: string;
      startDate: string
      completed: boolean;
      assignee: string;
      type: 'task';
    }

    export type EmailTask = {
        id: number;
        title: 'Send an automated Email';
        recipient: string;
        content: string;
        sendDate: string;
        completed: boolean;
        assignee: string;
        type: 'email';
    }

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
      tasks: (Task | EmailTask)[];
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
            title: "Send automated email",
            subject: "Welcome to the team 🎉",
            completed: false,
            assignee: "System",
            type: "email",
            recipient: 'karl.karlsson@example.com',
            content: 'Hi there! We are stoked that you are joing our team. On your first day, we will have a lot of fun stuff planned for you. ',
            sendDate: '2024-03-24T12:00:00'
          },
          {
            id: 2,
            title: "Prepare workstation",
            description: "Set up computer, access cards, and required software",
            dueDate: "2024-03-30",
            completed: false,
            assignee: "IT Support",
            type: "task",
            startDate: '2024-03-26'
          },
          {
            id: 3,
            title: "Schedule orientation",
            description: "Book introduction meetings with key team members",
            dueDate: "2024-04-01",
            completed: false,
            assignee: "Sarah Miller",
            type: "task",
            startDate: '2024-03-28'
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
            type: "task",
            startDate: '2024-03-16'
          },
          {
            id: 2,
            title: "Schedule team meeting",
            description: "Discuss findings with the team",
            dueDate: "2024-03-25",
            completed: false,
            assignee: "Sarah Miller",
            type: "task",
            startDate: '2024-03-22'
          }
        ]
      }
    ];
