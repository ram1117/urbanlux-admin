import { BlobServiceClient } from "@azure/storage-blob";

const CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING!;

const BlobServiceClientSingleton = () => {
  return BlobServiceClient.fromConnectionString(CONNECTION_STRING);
};

declare const globalThis: {
  blobGlobal: ReturnType<typeof BlobServiceClientSingleton>;
} & typeof global;

const blobClient = globalThis.blobGlobal ?? BlobServiceClientSingleton();
export default blobClient;
globalThis.blobGlobal = blobClient;
