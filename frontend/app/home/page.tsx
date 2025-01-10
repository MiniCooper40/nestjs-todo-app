"use client";

import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { useAuth } from "../lib/use-auth";
import { useListTodos } from "./api/use-list-todos";
import { CreateTodoForm } from "./components/create-todo-form";
import { TodoCard } from "./components/todo-card";

export default function Page() {
  const { auth } = useAuth();
  if (!auth) return null;

  const [isCreating, setIsCreating] = useState<boolean>(false);

  const { user } = auth;
  const todos = useListTodos(auth);

  return (
    <div className="flex flex-col justify-center items-center relative">
      {!isCreating && (
        <button
          className="z-50 absolute top-14 right-8 bg-[var(--compliment)] p-2 flex gap-2 items-center justify-center rounded text-white drop-shadow"
          onClick={() => setIsCreating(true)}
        >
          Create Todo
          <MdAdd size={32} fill="white" />
        </button>
      )}
      <div className="flex flex-row w-full justify-between items-center bg-[var(--compliment)] px-20 py-2">
        <div className="text-lg text-white font-bold uppercase">Todo List</div>
        <div className="text-lg text-white">{`Hello, ${user.username}`}</div>
      </div>
      <div className="flex w-full justify-between p-8 gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-bold">Uncompleted</h2>
            <div className="w-7/10 flex flex-wrap gap-4">
              {todos.data &&
                todos.data
                  .filter((todo) => !todo.completionTime)
                  .map((todo) => (
                    <TodoCard
                      todo={todo}
                      key={todo.todoId}
                      accessToken={auth.accessToken}
                    />
                  ))}
            </div>
          </div>
          <div>
            <h2 className="font-bold">Completed</h2>
            <div className="w-7/10 flex flex-wrap gap-4">
              {todos.data &&
                todos.data
                  .filter((todo) => !!todo.completionTime)
                  .map((todo) => (
                    <TodoCard
                      todo={todo}
                      key={todo.todoId}
                      accessToken={auth.accessToken}
                    />
                  ))}
            </div>
          </div>
        </div>
        {isCreating && (
          <div>
            <CreateTodoForm
              onCanceled={() => setIsCreating(false)}
              accessToken={auth.accessToken}
              user={user}
              onCreated={() => setIsCreating(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
