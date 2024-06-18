import DataNotFound from "@/atoms/DataNotFound";
import ImageWrapper from "@/atoms/ImageWrapper";
import { Button } from "@/components/ui/button";
import { IBrand } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getBrand } from "@/lib/apiurls";
import Link from "next/link";

const Page = async ({ params }: { params: { brandid: string } }) => {
  const id = params.brandid;
  const response = await makeApiRequest(API_METHODS.GET, getBrand(id));
  if (!response?.ok) return <DataNotFound></DataNotFound>;

  const data: IBrand = await response.json();

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-4">
        <div className="w-full col-span-1 md:col-span-1">
          <ImageWrapper
            src={data.logo}
            alt={"brand log"}
            imageSize={"w-full aspect-square max-w-[400px] mx-auto"}
          ></ImageWrapper>
        </div>
        <div className="w-full col-span-1 md:col-span-3 flex flex-col gap-4 p-8">
          <div className="flex justify-end">
            <Button className="w-max">
              <Link href={`/brands/edit/${data._id}`}>Edit</Link>
            </Button>
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
            <p>{data.brand_code}</p>
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="text-lg font-bold">Brand Store</h5>
            <p>{data.create_store ? "Yes" : "No"}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
