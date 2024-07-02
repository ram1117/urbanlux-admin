"use server";

import { IEditCategoryFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { createCategory } from "@/lib/apiurls";
import uploadImage from "@/lib/azure/azure.upload";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const validationSchema = z.object({
  thumbnail: z
    .any()
    .refine((file) => file !== null, "Image required")
    .refine(
      (file) => IMAGE_TYPES.includes(file?.type),
      "Invalid file. choose PNG/JPG/JPEG image",
    ),
  name: z.string().min(3),
  description: z.string().min(10),
  category_code: z.string().min(3),
});

const CreateCategoryAction = async (
  formState: IEditCategoryFormState,
  formData: FormData,
): Promise<IEditCategoryFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validation.success)
    return { success: false, errors: validation.error.flatten().fieldErrors };

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { thumbnail, ...restData } = validation.data;
    let bodyData: object = {};

    const imageUrl = await uploadImage(validation.data.thumbnail, "category");
    if (imageUrl) {
      bodyData = {
        ...restData,
        thumbnail: imageUrl,
        category_code: `cat_${restData.category_code}`,
      };
    }
    const { currentUser } = await getAuthenticatedAppForUser();

    const response = await makeApiRequest(
      API_METHODS.POST,
      createCategory(),
      bodyData,
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

  revalidatePath(`/categories`);
  return { success: true, errors: {} };
};

export default CreateCategoryAction;
