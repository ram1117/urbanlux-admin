import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex gap-4 flex-wrap p-4 border-b border-b-black">
      <Link href={"/"} className="border-r border-r-black pe-4">
        Dashboard
      </Link>
      <Link href={"/categories"} className="border-r border-r-black pe-4">
        Categories
      </Link>
      <Link href={"/brands"} className="border-r border-r-black pe-4">
        Brands
      </Link>
      <Link href={"/merchandise"}>Merchandise</Link>
    </nav>
  );
};

export default Navbar;
