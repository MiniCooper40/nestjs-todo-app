import { User } from "@/app/lib/types";
import { Formik } from "formik";
import {
  todoPayloadValidationSchema,
  useCreateTodo,
} from "../api/use-create-todo";

export function CreateTodoForm({
  accessToken,
  onCreated,
  onCanceled,
  user,
}: {
  accessToken: string;
  onCreated: () => void;
  onCanceled: () => void;
  user: User;
}) {
  const createTodo = useCreateTodo(accessToken, {
    onSuccess: onCreated,
  });

  const initialTodoValues = {
    username: user.username,
    title: "",
    description: "",
    priority: 0,
  };

  return (
    <Formik
      validationSchema={todoPayloadValidationSchema}
      onSubmit={createTodo.mutate}
      initialValues={initialTodoValues}
    >
      {(formik) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="title" className="pl-1 w-full">
              Title
            </label>
            <input
              id="title"
              placeholder="Title"
              className="p-2 rounded-md border-gray-400 border-2 w-full"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="description" className="pl-1 w-full">
              Description
            </label>
            <input
              id="description"
              placeholder="Description"
              className="p-2 rounded-md border-gray-400 border-2 w-full"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="priority" className="pl-1 w-full">
              Priority
            </label>
            <input
              id="priority"
              placeholder="Priority"
              className="p-2 rounded-md border-gray-400 border-2 w-full"
              name="priority"
              type="number"
              value={formik.values.priority}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => formik.handleSubmit()}
              type="submit"
              className={`px-12 py-2 bg-[var(--compliment)] rounded text-white w-52 ${
                createTodo.isPending ?? "disabled"
              }`}
            >
              Submit
            </button>
            <button
              onClick={onCanceled}
              className={`px-12 py-2 bg-[var(--compliment)] rounded text-white w-52 ${
                createTodo.isPending ?? "disabled"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Formik>
  );
}
