import ImageWrapper from "@/atoms/ImageWrapper";
import { IBrand } from "@/interfaces";
import Link from "next/link";

interface BrandItemProps {
  item: IBrand;
}

const BrandItem = ({ item }: BrandItemProps) => {
  return (
    <li className="flex flex-col gap-4">
      <Link href={`/brands/${item._id}`}>
        <ImageWrapper
          src={item.logo}
          alt={"brand logo"}
          imageSize={"w-full aspect-square"}
          sizes="(max-width:768px) 100vw,35vw"
        ></ImageWrapper>
        <p className="text-lg">{item.name}</p>
      </Link>
    </li>
  );
};

export default BrandItem;
