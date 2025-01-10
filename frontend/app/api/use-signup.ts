import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as yup from "yup";
import { API_URL } from "../lib/constants";

export const signupPayloadValidationSchema = yup.object({
  username: yup.string(),
  password: yup.string(),
});

export type SignupPayload = yup.InferType<typeof signupPayloadValidationSchema>;

const api = axios.create();

export const signup = (payload: SignupPayload): Promise<any> =>
  api.post(`${API_URL}/user`, payload);
