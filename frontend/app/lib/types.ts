export type User = {
  username: string;
  userId: number;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type Todo = {
  todoId: number;
  title: string;
  description: string;
  createdTime: string;
  dueTime?: string;
  completionTime?: string;
  priority: number;
};
