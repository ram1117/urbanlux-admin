import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex gap-4 flex-wrap p-4 border-b border-b-black">
      <Link href={"/categories"}>Categories</Link>
      <Link href={"/brands"}>Brands</Link>
      <Link href={"/merchandise"}>Merchandise</Link>
    </nav>
  );
};

export default Navbar;
