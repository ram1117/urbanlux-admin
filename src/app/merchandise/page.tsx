import DataNotFound from "@/atoms/DataNotFound";
import MerchandiseItem from "@/components/merchandise/MerchandiseItem";
import { Button } from "@/components/ui/button";
import { IMerchandise } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getAllMerchandise } from "@/lib/apiurls";
import Link from "next/link";

const Page = async () => {
  const response = await makeApiRequest(API_METHODS.GET, getAllMerchandise());
  if (!response?.ok) return <DataNotFound></DataNotFound>;

  const data = await response.json();

  return (
    <main className="min-h-screen p-4 lg:p-8">
      <div className="w-full py-4 border-b-2 flex justify-end">
        <Button>
          <Link href={"/merchandise/new"}>New Merchandise</Link>
        </Button>
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-6 w-full gap-4 my-4 p-4">
        {data.map((item: IMerchandise) => (
          <MerchandiseItem item={item} key={item._id}></MerchandiseItem>
        ))}
      </ul>
    </main>
  );
};

export default Page;
