"use client";

import { useContext } from "react";
import { AuthContext } from "./auth-context";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw Error("Auth context is being used outside of an auth provider");
  }
  return authContext;
};
