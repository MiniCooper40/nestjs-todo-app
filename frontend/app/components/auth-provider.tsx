"use client";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { login, LoginPayload } from "../api/use-login";
import { signup, SignupPayload } from "../api/use-signup";
import { AuthContext } from "../lib/auth-context";
import { AuthResponse } from "../lib/types";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthResponse | null>(null);
  const router = useRouter();

  const useLogin = (
    options?: UseMutationOptions<AuthResponse, any, LoginPayload, any>
  ) =>
    useMutation<AuthResponse, any, LoginPayload, any>({
      ...options,
      mutationFn: login,
      onSuccess: (auth, ...args) => {
        console.log(`got auth`, auth);
        setAuth(auth);
        options?.onSuccess?.(auth, ...args);
      },
    });

  const useSignup = (
    options?: UseMutationOptions<any, any, SignupPayload, any>
  ) =>
    useMutation<any, any, SignupPayload, any>({
      ...options,
      mutationFn: signup,
      onSuccess: (...args) => {
        router.push("/");
        alert("You succesffuly created an account. Please log in");
        options?.onSuccess?.(...args);
      },
    });

  return (
    <AuthContext.Provider
      value={{
        auth,
        useLogin,
        useSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
