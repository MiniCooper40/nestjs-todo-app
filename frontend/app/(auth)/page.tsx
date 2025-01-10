"use client";

import { LoginForm } from "./components/login-form";

export default function Page() {
  return (
    <div className="flex h-full w-full bg-[url('/desk.jpg')] bg-cover">
      <div className="flex flex-col justify-center items-center p-24 gap-4 bg-[var(--background)] w-2/5">
        <LoginForm />
      </div>
    </div>
  );
}
