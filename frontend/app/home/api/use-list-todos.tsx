import { api } from "@/app/lib/axios";
import { API_URL } from "@/app/lib/constants";
import { AuthResponse, Todo } from "@/app/lib/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const listTodos = (username: string, accessToken: string): Promise<Todo[]> => {
  return api.get(`${API_URL}/user/${username}/todo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const useListTodos = (
  auth: AuthResponse,
  options?: UseQueryOptions<any, any, Todo[], any>
) => {
  return useQuery({
    ...options,
    queryFn: () => listTodos(auth.user.username, auth.accessToken),
    queryKey: ["list-todo"],
  });
};
