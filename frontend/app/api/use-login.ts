import * as yup from "yup";
import { api } from "../lib/axios";
import { API_URL } from "../lib/constants";
import { AuthResponse } from "../lib/types";

export const loginPayloadValidationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export type LoginPayload = yup.InferType<typeof loginPayloadValidationSchema>;

export const login = (payload: LoginPayload): Promise<AuthResponse> =>
  api.post(`${API_URL}/auth/login`, payload);
