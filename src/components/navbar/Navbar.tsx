import Link from "next/link";
import UserProfile from "./UserProfile";

interface NavbarProps {
  initialUser: any;
}

const Navbar = async ({ initialUser }: NavbarProps) => {
  return (
    <nav className="flex gap-4 flex-wrap justify-between p-4 border-b border-b-black">
      <div className="flex gap-4 flex-wrap">
        <Link href={"/"} className=" pe-4">
          Dashboard
        </Link>
        <Link href={"/categories"} className=" pe-4">
          Categories
        </Link>
        <Link href={"/brands"} className=" pe-4">
          Brands
        </Link>
        <Link href={"/merchandise"}>Merchandise</Link>
      </div>
      <UserProfile initialUser={initialUser}></UserProfile>
    </nav>
  );
};

export default Navbar;
