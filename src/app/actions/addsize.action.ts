"use server";

import { IAddSizeFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { addNewSize } from "@/lib/apiurls";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const validationSchema = z.object({
  size: z.string().min(1),
});

const AddSizeAction = async (
  id: string,
  formState: IAddSizeFormState,
  formData: FormData,
): Promise<IAddSizeFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const response = await makeApiRequest(
      API_METHODS.POST,
      addNewSize(id),
      validation.data,
    );

    if (!response?.ok) {
      const error = await response?.json();
      return { success: false, errors: { _form: [error.message] } };
    }
  } catch (error) {
    if (error instanceof Error)
      return { success: false, errors: { _form: [error.message] } };
    return { success: false, errors: { _form: ["Something went wrong"] } };
  }

  revalidatePath(`/merchandise/${id}`);
  return { success: true, errors: {} };
};

export default AddSizeAction;
