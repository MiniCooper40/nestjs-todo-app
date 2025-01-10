import { api } from "@/app/lib/axios";
import { API_URL } from "@/app/lib/constants";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

const deleteTodo = (accessToken: string, todoId: number) =>
  api.delete(`${API_URL}/todo/${todoId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const useDeleteTodo = (
  accessToken: string,
  options?: UseMutationOptions<any, any, number, any>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: (todoId: number) => deleteTodo(accessToken, todoId),
    onSuccess: (...args) => {
      queryClient.invalidateQueries();
      options?.onSuccess?.(...args);
    },
  });
};
