"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "../lib/use-auth";

export default function Layout({ children }: { children: ReactNode }) {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth) router.push("/home");
  }, [auth]);

  return children;
}
