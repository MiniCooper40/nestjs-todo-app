"use client";

import { useAuth } from "../lib/use-auth";
import { useListTodos } from "./api/use-list-todos";
import { TodoCard } from "./components/todo-card";

export default function Page() {
  const { auth } = useAuth();
  if (!auth) return null;

  const { user } = auth;
  const todos = useListTodos(auth);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1>{`Home!! Welcome ${user.username}`}</h1>
      </div>
      <div className="w-7/10">
        {todos.data &&
          todos.data.map((todo) => <TodoCard todo={todo} key={todo.title} />)}
      </div>
    </div>
  );
}
