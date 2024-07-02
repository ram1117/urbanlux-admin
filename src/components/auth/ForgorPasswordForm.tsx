"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import FormSubmit from "@/atoms/FormSubmit";
import { z } from "zod";
import { forgotPassword } from "@/lib/firebase/firebase.auth";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  email: z.string().email({ message: "Should be a valid email" }),
});

interface FormStateType {
  errors: {
    email?: string[];
    _form?: string[];
  };
}

const ForgotPasswordForm = () => {
  const [formState, setFormState] = useState<FormStateType>({ errors: {} });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const validation = validationSchema.safeParse(
      Object.fromEntries(formData.entries()),
    );
    if (!validation.success) {
      setFormState({ errors: validation.error.flatten().fieldErrors });
    } else {
      try {
        await forgotPassword(validation.data?.email);
        router.push("/auth/signin");
      } catch (error) {
        if (error instanceof Error)
          setFormState({ errors: { _form: [error.message] } });
        else setFormState({ errors: { _form: ["Something went wrong"] } });
      }
    }
  };
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

      <p className="text-red-800 text-xs">
        {formState.errors["_form"]?.join(",")}
      </p>
      <FormSubmit className="rounded-none w-max" text="Send Link"></FormSubmit>
    </form>
  );
};

export default ForgotPasswordForm;
