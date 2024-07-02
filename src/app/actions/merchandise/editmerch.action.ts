"use server";

import { IEditMerchFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { updateMerchandise } from "@/lib/apiurls";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const validationSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  features: z.string().min(10),
  brand: z.string().min(2),
  category: z.string().min(2),
  color: z.string().min(3),
});

const EditMerchAction = async (
  id: string,
  formState: IEditMerchFormState,
  formData: FormData,
): Promise<IEditMerchFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validation.success)
    return { success: false, errors: validation.error.flatten().fieldErrors };
  revalidatePath(`/merchandise/${id}`);

  try {
    const { currentUser } = await getAuthenticatedAppForUser();
    const response = await makeApiRequest(
      API_METHODS.PATCH,
      updateMerchandise(id),
      { ...validation.data, features: validation.data.features.split("/") },
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

  revalidatePath(`/merchandise/${id}`);
  return { success: true, errors: {} };
};

export default EditMerchAction;
