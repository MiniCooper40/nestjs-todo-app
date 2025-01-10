import { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { createContext } from "react";
import { LoginPayload } from "../api/use-login";
import { SignupPayload } from "../api/use-signup";
import { AuthResponse } from "./types";

type AuthContextType = {
  auth: AuthResponse | null;
  useLogin: (
    options?: UseMutationOptions<AuthResponse, any, LoginPayload, any>
  ) => UseMutationResult<AuthResponse, any, LoginPayload, any>;
  useSignup: (
    options?: UseMutationOptions<any, any, SignupPayload, any>
  ) => UseMutationResult<any, any, SignupPayload, any>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
