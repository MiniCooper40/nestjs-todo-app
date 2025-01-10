import { api } from "@/app/lib/axios";
import { API_URL } from "@/app/lib/constants";
import { Todo } from "@/app/lib/types";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

type EditTodoPayload = Partial<Todo>;

const editTodo = (
  accessToken: string,
  todoId: number,
  editPayload: EditTodoPayload
) => {
  return api.patch(`${API_URL}/todo/${todoId}`, editPayload, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const useEditTodo = (
  accessToken: string,
  todoId: number,
  options?: UseMutationOptions<any, any, EditTodoPayload, any>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: (editPayload: EditTodoPayload) =>
      editTodo(accessToken, todoId, editPayload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries();
      options?.onSuccess?.(...args);
    },
  });
};
