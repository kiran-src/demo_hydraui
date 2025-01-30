export interface Epic {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    startDate?: Date;
    dueDate?: Date;
  }
  
  export interface Sprint {
    id: string;
    name: string;
    goal: string;
    status: string;
    startDate?: Date;
    endDate?: Date;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assignee?: string;
    epic?: Epic;
    sprint?: Sprint;
    storyPoints?: number;
    startDate?: Date;
    dueDate?: Date;
  }