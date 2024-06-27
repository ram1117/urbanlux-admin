"use client";

import FormSubmit from "@/atoms/FormSubmit";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SigninFormState } from "@/interfaces";
import { firebaseAuth } from "@/lib/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "password cannot be empty" }),
});

const initialState: SigninFormState = { errors: { _form: [] } };

const SigninForm = () => {
  const [formState, setFormState] = useState<SigninFormState>(initialState);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validation = validationSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );

    if (!validation.success) {
      setFormState({ errors: validation.error.flatten().fieldErrors });
    } else {
      try {
        await signInWithEmailAndPassword(
          firebaseAuth,
          validation.data.email.toString(),
          validation.data.password.toString(),
        );
        router.push("/");
      } catch (error) {
        if (error instanceof FirebaseError) {
          setFormState({ errors: { _form: [error.message] } });
        }
      }
    }
  }

  return (
    <form
      className="w-11/12 mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          id="email"
          className="rounded-none border-dark"
        ></Input>
        <p className="text-red-800 text-xs">
          {formState.errors["email"]?.join(",")}
        </p>
      </div>
      <div className="w-full">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          className="rounded-none border-dark"
        ></Input>
        <p className="text-red-800 text-xs">
          {formState.errors["password"]?.join(",")}
        </p>
      </div>
      <p className="text-red-800 text-xs">
        {formState.errors["_form"]?.join(",")}
      </p>
      <FormSubmit className="rounded-none w-max" text="Sign In"></FormSubmit>
    </form>
  );
};

export default SigninForm;
