"use server";

import { ISignupFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { postCreateUser } from "@/lib/apiurls";
import { redirect } from "next/navigation";
import { z } from "zod";

const validationSchema = z
  .object({
    firstname: z.string().min(3),
    lastname: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Should be at least 8 characters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Should contain at least one capital, one small letter, one special character and one number",
      }),
    password1: z
      .string()
      .min(8, { message: "Should be at least 8 characters long" }),
    mobile: z
      .string()
      .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, {
        message: "Invalid mobile number",
      }),
  })
  .refine((schema) => schema.password === schema.password1, {
    message: `Passwords don't match`,
    path: ["password1"],
  });

const SignupAction = async (
  formState: ISignupFormState,
  formData: FormData,
): Promise<ISignupFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validation.success) {
    return { errors: validation.error.flatten().fieldErrors };
  }

  try {
    const response = await makeApiRequest(
      API_METHODS.POST,
      postCreateUser(),
      validation.data,
    );

    if (!response?.ok) {
      const error = await response?.json();
      return { errors: { _form: [error.message] } };
    }
  } catch (error) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };
    return { errors: { _form: ["Unable to sign up"] } };
  }

  redirect("/auth/signin");
};

export default SignupAction;
