export class CreateTodoDto {
  username: string;
  title: string;
  description: string;
  priority: number;
  dueDate: Date | null;
}
