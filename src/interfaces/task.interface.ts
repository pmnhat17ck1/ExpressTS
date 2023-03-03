export interface TaskI {
  id: string;
  title: string;
  description: string;
  pin: boolean;
  dueDate: Date;
  created_at: Date;
  updated_at: Date;
}
