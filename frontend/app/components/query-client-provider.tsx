"use client";

import { QueryClientProvider as DefaultQueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "../lib/react-query";

export default function QueryClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DefaultQueryClientProvider client={queryClient}>
      {children}
    </DefaultQueryClientProvider>
  );
}
