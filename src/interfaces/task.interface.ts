export interface TaskI {
  id: string;
  title: string;
  description: string;
  summary: string;
  assignee: string;
  reporter: string;
  linkIssue: string;
  dueDate: Date;
}
