import ImageWrapper from "@/atoms/ImageWrapper";
import { IMerchandise } from "@/interfaces";
import Link from "next/link";

interface MerchandiseItemProps {
  item: IMerchandise;
}

const MerchandiseItem = ({ item }: MerchandiseItemProps) => {
  return (
    <li className="flex flex-col gap-4 border">
      <Link href={`/merchandise/${item._id}`}>
        <ImageWrapper
          src={item.thumbnail}
          alt={"merchandise image"}
          imageSize={"w-full aspect-square"}
          sizes="(max-width:768px) 100vw,35vw"
        ></ImageWrapper>
        <p className="text-base p-2">{item.name}</p>
      </Link>
    </li>
  );
};

export default MerchandiseItem;
