import DataNotFound from "@/atoms/DataNotFound";
import ImageWrapper from "@/atoms/ImageWrapper";
import AddImageDialog from "@/components/merchandise/AddImageDialog";
import AddSizeDialog from "@/components/merchandise/AddSizeDialog";
import DeleteImageForm from "@/components/merchandise/DeleteImageForm";
import EditMerchDialog from "@/components/merchandise/EditMerchDialog";
import InventoryDialog from "@/components/merchandise/InventoryDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IInventory, IMerchandise } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getMerchandise } from "@/lib/apiurls";
import {
  getAuthenticatedAppForUser,
  redirectToLogin,
} from "@/lib/firebase/firebase.server";

const Page = async ({ params }: { params: { itemid: string } }) => {
  await redirectToLogin();
  const { currentUser } = await getAuthenticatedAppForUser();
  const response = await makeApiRequest(
    API_METHODS.GET,
    getMerchandise(params.itemid),
    {},
    await currentUser?.getIdToken(),
  );
  if (!response?.ok) return <DataNotFound></DataNotFound>;

  const data: IMerchandise = await response.json();
  return (
    <main className="min-h-screen p-4 lg:p-8">
      <section className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="w-full col-span-1">
          <ImageWrapper
            src={data.thumbnail}
            alt={"product image thumbnail"}
            imageSize={"w-full aspect-square max-w-[300px] mx-auto"}
          ></ImageWrapper>
        </div>
        <div className="col-span-1 md:col-span-3 border p-4">
          <div className="flex justify-end">
            <EditMerchDialog merchandise={data}></EditMerchDialog>
          </div>

          <div className="flex flex-col my-1">
            <h6 className="font-bold">Product Name</h6>
            <h6>{data.name}</h6>
          </div>
          <div className="flex flex-col my-1">
            <h6 className="font-bold">Color</h6>
            <h6>{data.color}</h6>
          </div>

          <div className="flex flex-col my-1">
            <h6 className="font-bold">Description</h6>
            <h6>{data.description}</h6>
          </div>
          <div className="flex flex-col my-1">
            <h6 className="font-bold">Brand</h6>
            <h6>{data.brand.name}</h6>
          </div>
          <div className="flex flex-col my-1">
            <h6 className="font-bold">Category</h6>
            <h6>{data.category.name}</h6>
          </div>
          <div className="flex flex-col my-1">
            <h6 className="font-bold">Features</h6>
            <ul className="px-4">
              {data.features.map((item: string) => (
                <li className="list-disc" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4 items-center">
            <InventoryDialog
              items={data.inventory}
              merchandiseId={data._id}
            ></InventoryDialog>
            <AddSizeDialog id={data._id}></AddSizeDialog>
          </div>

          <Table className="my-4 text-black">
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price $</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.inventory.map((item: IInventory) => (
                <TableRow key={item._id}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>$ {item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="min-h-[30vh]">
        <div className="my-6">
          <AddImageDialog id={data._id} name={data.name}></AddImageDialog>
        </div>
        <ul className=" grid grid-cols-2 lg:grid-cols-4 my-6 gap-4">
          {data.images.map((image: string) => {
            if (image)
              return (
                <DeleteImageForm
                  image={image}
                  id={data._id}
                  key={image}
                ></DeleteImageForm>
              );
          })}
        </ul>
      </section>
    </main>
  );
};

export default Page;
