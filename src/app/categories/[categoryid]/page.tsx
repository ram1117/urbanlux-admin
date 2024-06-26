import DataNotFound from "@/atoms/DataNotFound";
import ImageWrapper from "@/atoms/ImageWrapper";
import EditCategoryDialog from "@/components/categories/EditCategoryDialog";
import { ICategory } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getCategory } from "@/lib/apiurls";

const Page = async ({ params }: { params: { categoryid: string } }) => {
  const id = params.categoryid;
  const response = await makeApiRequest(API_METHODS.GET, getCategory(id));
  if (!response?.ok) return <DataNotFound></DataNotFound>;

  const data: ICategory = await response.json();

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-4">
        <div className="w-full col-span-1 md:col-span-1">
          <ImageWrapper
            src={data.thumbnail}
            alt={"Category thumbnail"}
            imageSize={"w-full aspect-square max-w-[400px] mx-auto"}
          ></ImageWrapper>
        </div>
        <div className="w-full col-span-1 md:col-span-3 flex flex-col gap-4 p-8">
          <div className="flex justify-end">
            <EditCategoryDialog category={data}></EditCategoryDialog>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold">Name</h5>
            <h5>{data.name}</h5>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold">Description</h5>
            <p>{data.description} </p>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold">Code</h5>
            <p>{data.category_code}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
