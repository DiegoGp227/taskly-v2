// import ProfileButton from "../ProfileButton/index.tsx";
import tasklyImg from "@/public/taskly.png";
import Image from "next/image.js";
import Link from "next/link.js";
import { FaRegUserCircle } from "react-icons/fa";

function Header() {
  return (
    <header className="h-12 p-2.5 bg-blue flex justify-between items-center">
      <div>
        <Image
          src={tasklyImg}
          alt="Logo"
          width={100}
          height={100}
          className="w-10 h-auto mr-2.5"
        />
      </div>
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-green"
        >
          taskly
        </Link>
      </div>
      <button className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer">
        <FaRegUserCircle className="text-green hover:text-green w-full h-full" />
      </button>
    </header>
  );
}

export default Header;
