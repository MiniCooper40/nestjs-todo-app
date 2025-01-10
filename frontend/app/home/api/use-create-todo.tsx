import { api } from "@/app/lib/axios";
import { API_URL } from "@/app/lib/constants";
import { Todo } from "@/app/lib/types";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import * as yup from "yup";

export const todoPayloadValidationSchema = yup.object({
  title: yup.string().required(),
  priority: yup.number().positive().required(),
  description: yup.string().required(),
  username: yup.string().required(),
});

export type CreateTodoPayload = yup.InferType<
  typeof todoPayloadValidationSchema
>;

const createTodo = (
  accessToken: string,
  todo: CreateTodoPayload
): Promise<Todo> =>
  api.post(`${API_URL}/todo`, todo, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

export const useCreateTodo = (
  accessToken: string,
  options?: UseMutationOptions<Todo, any, CreateTodoPayload, any>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: (todo: CreateTodoPayload) => createTodo(accessToken, todo),
    onSuccess: (...args) => {
      queryClient.invalidateQueries();
      options?.onSuccess?.(...args);
    },
  });
};
