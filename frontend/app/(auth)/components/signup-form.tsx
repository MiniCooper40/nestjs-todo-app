"use client";

import {
  SignupPayload,
  signupPayloadValidationSchema,
} from "@/app/api/use-signup";
import { useAuth } from "@/app/lib/use-auth";
import { Formik } from "formik";

const initialSignupValues: SignupPayload = {
  username: "",
  password: "",
};

export function SignupForm() {
  const { useSignup } = useAuth();
  const login = useSignup();

  return (
    <Formik
      validationSchema={signupPayloadValidationSchema}
      initialValues={initialSignupValues}
      onSubmit={(values) => {
        console.log({ values });
        login.mutate(values);
      }}
    >
      {(formik) => (
        <>
          <h1 className="w-full">Sign up</h1>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="username" className="pl-1 w-full">
              Username
            </label>
            <input
              id="username"
              placeholder="Username"
              className="p-2 rounded-md border-gray-400 border-2 w-full"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            ></input>
          </div>
          <div className="flex flex-row w-full justify-left">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="username" className="pl-1">
                Password
              </label>
              <input
                id="password"
                placeholder="Password"
                type="password"
                className="p-2 rounded-md border-gray-400 border-2 w-full"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => formik.handleSubmit()}
              className={`px-12 py-2 bg-[var(--compliment)] rounded text-white w-52 ${
                login.isPending ?? "disabled"
              }`}
            >
              Submit
            </button>
            <div className="text-xs">
              Already have an account?{" "}
              <a href="/" className="underline">
                Login here
              </a>
              .
            </div>
          </div>
        </>
      )}
    </Formik>
  );
}
