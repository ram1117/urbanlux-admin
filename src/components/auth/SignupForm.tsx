"use client";

import FormSubmit from "@/atoms/FormSubmit";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ISignupFormState } from "@/interfaces";
import { useFormState } from "react-dom";
import SignupAction from "@/app/actions/auth/signup.action";

const initialState: ISignupFormState = {
  success: false,
  errors: {},
};

const SignupForm = () => {
  const [formState, formAction] = useFormState(SignupAction, initialState);
  return (
    <form className="w-11/12 mx-auto flex flex-col gap-4" action={formAction}>
      <div className="w-full">
        <Label htmlFor="firstname">First Name</Label>
        <Input
          name="firstname"
          id="firstname"
          className="rounded-none border-dark"
        ></Input>
        <p className="text-red-800 text-xs">
          {formState.errors["firstname"]?.join(",")}
        </p>
      </div>
      <div className="w-full">
        <Label htmlFor="lastname">Last Name</Label>
        <Input
          name="lastname"
          id="lastname"
          className="rounded-none border-dark"
        ></Input>
        <p className="text-red-800 text-xs">
          {formState.errors["lastname"]?.join(",")}
        </p>
      </div>
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
      <div className="w-full">
        <Label htmlFor="password1">Repeat Password</Label>
        <Input
          type="password"
          name="password1"
          id="password1"
          className="rounded-none border-dark"
        ></Input>
        <p className="text-red-800 text-xs">
          {formState.errors["password1"]?.join(",")}
        </p>
      </div>
      <div className="w-full">
        <Label htmlFor="firstname">Mobile</Label>
        <Input
          name="mobile"
          id="mobile"
          className="rounded-none border-dark"
        ></Input>
        <p className="text-red-800 text-xs">
          {formState.errors["mobile"]?.join(",")}
        </p>
      </div>
      <p className="text-red-800 text-xs">
        {formState.errors["_form"]?.join(",")}
      </p>
      <FormSubmit className="rounded-none w-max" text="Sign In"></FormSubmit>
    </form>
  );
};

export default SignupForm;
