import { Todo } from "@/app/lib/types";

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="w-52 bg-white p-6 rounded-lg drop-shadow-sm">
      <h2>{todo.title}</h2>
      <div>{todo.description}</div>
    </div>
  );
}
