import ImageWrapper from "@/atoms/ImageWrapper";
import { ICategory } from "@/interfaces";
import Link from "next/link";

interface CategoryItemProps {
  item: ICategory;
}

const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <li className="flex flex-col gap-4 border">
      <Link href={`/categories/view/${item._id}`}>
        <ImageWrapper
          src={item.thumbnail}
          alt={"Category image"}
          imageSize={"w-full aspect-square"}
          sizes="(max-width:768px) 100vw,35vw"
        ></ImageWrapper>
        <p className="text-lg">{item.name}</p>
      </Link>
    </li>
  );
};

export default CategoryItem;
