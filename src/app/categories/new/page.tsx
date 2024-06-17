import NewCategoryForm from "@/components/categories/New/NewCategoryForm";

const Page = () => {
  return (
    <main className="min-h-screen">
      <h1 className="text-2xl font-bold py-4 text-center">
        Create New Category
      </h1>
      <NewCategoryForm></NewCategoryForm>
    </main>
  );
};

export default Page;
