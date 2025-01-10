export type User = {
  username: string;
  userId: number;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type Todo = {
  title: string;
  description: string;
  creationTime: Date;
  dueTime?: Date;
  completionTime?: Date;
  priority: number;
};
