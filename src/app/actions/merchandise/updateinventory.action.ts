"use server";

import { IUpdateInventoryFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { updateInventory } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const validationSchema = z.object({
  stock: z.preprocess((val) => Number(val), z.number()),
  price: z.preprocess((val) => Number(val), z.number().min(1)),
});

const UpdateInventoryAction = async (
  id: string,
  merchandiseId: string,
  formState: IUpdateInventoryFormState,
  formData: FormData,
): Promise<IUpdateInventoryFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const { currentUser } = await getAuthenticatedAppForUser();
    const response = await makeApiRequest(
      API_METHODS.PATCH,
      updateInventory(id),
      { ...validation.data, merchandiseId },
      await currentUser?.getIdToken(),
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
  revalidatePath(`/merchandise/${merchandiseId}`);
  return { success: true, errors: {} };
};

export default UpdateInventoryAction;
