"use client";

import DeleteImageAction from "@/app/actions/merchandise/deleteimage.action";
import FormSubmit from "@/atoms/FormSubmit";
import ImageWrapper from "@/atoms/ImageWrapper";
import { IGenericFormState } from "@/interfaces";
import { useFormState } from "react-dom";

interface DeleteImageFormProps {
  image: string;
  id: string;
}

const initialState: IGenericFormState = { errors: { _form: [] } };

const DeleteImageForm = ({ image, id }: DeleteImageFormProps) => {
  const bindedAction = DeleteImageAction.bind(null, id, image);
  const [formState, formAction] = useFormState(bindedAction, initialState);
  return (
    <li className="relative">
      <ImageWrapper
        src={image}
        alt={"product image"}
        imageSize={"w-full aspect-square"}
        key={image}
      ></ImageWrapper>
      <form action={formAction}>
        <FormSubmit
          className="absolute right-0 bottom-0"
          text="Delete"
        ></FormSubmit>
        <p className="text-xs text-red-800">
          {formState.errors._form?.join(", ")}
        </p>
      </form>
    </li>
  );
};

export default DeleteImageForm;
