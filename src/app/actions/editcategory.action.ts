"use server";

import { IEditCategoryFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { updateCategory } from "@/lib/apiurls";
import uploadImage from "@/lib/azure/azure.upload";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const validationSchema = z.object({
  thumbnail: z
    .any()
    .refine(
      (file) =>
        file.length > 0
          ? IMAGE_TYPES.includes(file?.[0]?.type)
            ? true
            : false
          : true,
      "Invalid file. choose PNG/JPG/JPEG image",
    ),
  name: z.string().min(3),
  description: z.string().min(10),
});

const EditCategoryAction = async (
  id: string,
  formState: IEditCategoryFormState,
  formData: FormData,
): Promise<IEditCategoryFormState> => {
  const validation = validationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validation.success)
    return { success: false, errors: validation.error.flatten().fieldErrors };

  try {
    const { thumbnail, ...restData } = validation.data;
    let bodyData: object = { ...restData };

    if (thumbnail.size > 0) {
      const imageUrl = await uploadImage(validation.data.thumbnail, "category");
      if (imageUrl) {
        bodyData = { ...restData, thumbnail: imageUrl };
      }
    }

    const response = await makeApiRequest(
      API_METHODS.PATCH,
      updateCategory(id),
      bodyData,
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
  revalidatePath(`/categories/${id}`);
  return { success: true, errors: {} };
};

export default EditCategoryAction;
