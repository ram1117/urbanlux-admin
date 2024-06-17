import blobClient from "./azure.config";
import { v4 as uuidv4 } from "uuid";

const uploadImage = async (image: File, foldername = "misc") => {
  const containerClient = blobClient.getContainerClient(
    process.env.AZURE_CONTAINER_NAME!,
  );
  const filename = `/${foldername}/${uuidv4()}${image.name}`;
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  await blockBlobClient.uploadData(imageBuffer, {
    blobHTTPHeaders: { blobContentType: "image/png" },
  });
  return blockBlobClient.url;
};

export default uploadImage;
