"use server";

import { IAddMerchFormState } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { createMerchandise } from "@/lib/apiurls";
import uploadImage from "@/lib/azure/azure.upload";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase.server";
import { redirect } from "next/navigation";
import { z } from "zod";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
const validationSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  features: z.string().min(10),
  sizes: z.string().min(2),
  brand: z.string().min(2),
  category: z.string().min(2),
  color: z.string().min(3),
  thumbnail: z
    .any()
    .refine((file) => file !== null, "Image required")
    .refine(
      (file) => IMAGE_TYPES.includes(file?.type),
      "Invalid file. choose PNG/JPG/JPEG image",
    ),
  images: z
    .array(z.instanceof(File))
    .refine((files) =>
      files.every(
        (file) => IMAGE_TYPES.includes(file?.type),
        "Invalid file. choose PNG/JPG/JPEG image",
      ),
    ),
});

const AddMerchAction = async (
  formState: IAddMerchFormState,
  formData: FormData,
): Promise<IAddMerchFormState> => {
  const images = formData.getAll("images");
  const validation = validationSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    images,
  });
  if (!validation.success)
    return { errors: validation.error.flatten().fieldErrors };

  let responseData: any;

  try {
    const thumbnailUrl = await uploadImage(
      validation.data.thumbnail,
      `merchandise/${validation.data.name}`,
    );
    const imagesUrl = await Promise.all(
      validation.data.images.map(async (image: File) => {
        const url = await uploadImage(
          image,
          `merchandise/${validation.data.name}`,
        );
        return url;
      }),
    );

    if (imagesUrl && thumbnailUrl) {
      const { currentUser } = await getAuthenticatedAppForUser();
      const response = await makeApiRequest(
        API_METHODS.POST,
        createMerchandise(),
        {
          ...validation.data,
          images: imagesUrl,
          thumbnail: thumbnailUrl,
          features: validation.data.features.split("/"),
          sizes: validation.data.sizes.split(","),
        },
        await currentUser?.getIdToken(),
      );
      if (!response?.ok) {
        const error = await response?.json();
        return { errors: { _form: [error.message] } };
      }
      responseData = await response.json();
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) return { errors: { _form: [error.message] } };
    return { errors: { _form: ["Somethig went wrong"] } };
  }

  redirect(`/merchandise/${responseData._id}`);
};

export default AddMerchAction;
