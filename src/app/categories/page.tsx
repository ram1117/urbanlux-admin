import CategoryItem from "@/components/categories/CategoryItem";
import { ICategory } from "@/interfaces";
import { API_METHODS, makeApiRequest } from "@/lib/apiservice";
import { getCategories } from "@/lib/apiurls";

const Page = async () => {
  const response = await makeApiRequest(API_METHODS.GET, getCategories());
  if (!response?.ok) {
    console.log(await response?.json());
    return <h2 className="text-lg text-center">Unable to fetch data</h2>;
  }

  const data = await response.json();

  return (
    <main className="min-h-screen">
      <ul className="grid grid-cols-2 lg:grid-cols-6 w-full gap-8">
        {data.map((item: ICategory) => (
          <CategoryItem item={item} key={item._id}></CategoryItem>
        ))}
      </ul>
    </main>
  );
};

export default Page;
