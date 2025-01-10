import { Todo } from "@/app/lib/types";
import { MdCancel, MdCheck, MdEdit } from "react-icons/md";
import { useDeleteTodo } from "../api/use-delete-todo";
import { useEditTodo } from "../api/use-edit-todo";

export function TodoCard({
  todo,
  accessToken,
}: {
  todo: Todo;
  accessToken: string;
}) {
  const editTodo = useEditTodo(accessToken, todo.todoId);
  const deleteTodo = useDeleteTodo(accessToken);

  const handleComplete = () =>
    editTodo.mutate({
      completionTime: new Date().toLocaleDateString(),
    });

  const handleDelete = () => {
    deleteTodo.mutate(todo.todoId);
  };

  return (
    <div className="max-w-96 min-w-52 bg-white rounded-lg drop-shadow-sm overflow-hidden gap-4 flex flex-col justify-between">
      <div>
        <div className="bg-[var(--compliment)] w-full p-2">
          <h2 className="text-white">{todo.title}</h2>
        </div>
        <div className="p-2 text-sm flex flex-col">
          <div>{todo.description}</div>
          <div className="flex flex-col gap-2 pt-2">
            <div>
              <span className="font-bold">Priority: </span>
              {todo.priority ?? "N/A"}
            </div>
            <div>
              <span className="font-bold">Created: </span>
              {todo.createdTime.split("T")[0]}
            </div>
            {!!todo.completionTime && (
              <div>
                <span className="font-bold">Completed: </span>
                {todo.completionTime.split("T")[0]}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row px-4 items-center justify-center gap-x-10 w-full py-1">
        {!todo.completionTime && (
          <>
            <button>
              <MdEdit size={24} />
            </button>
            <button onClick={handleDelete}>
              <MdCancel size={24} />
            </button>
            <button onClick={handleComplete}>
              <MdCheck size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
