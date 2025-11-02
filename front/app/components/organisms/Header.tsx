"use client";
import tasklyImg from "@/public/taskly.png";
import Image from "next/image.js";
import Link from "next/link.js";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hiddenRoutes = ["/sign_up", "/login", "/not-found"];

  // Verificamos si coincide exactamente con alguna
  const hideHeader = hiddenRoutes.includes(pathname);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
  };
  
  return (
    <header
      className={`h-12 p-2.5 bg-blue flex justify-between items-center ${
        hideHeader ? "hidden" : ""
      }`}
    >
      <div>
        <Image
          src={tasklyImg}
          alt="Logo"
          width={100}
          height={100}
          className="w-10 h-auto mr-2.5 cursor-pointer"
          onClick={() => router.push("/")}
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
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <FaRegUserCircle className="text-green hover:text-green w-full h-full" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-hard-gray border-2 border-soft-gray rounded-md shadow-lg z-50 p-2">
              <button
                onClick={handleLogout}
                className="w-full p-2 text-red-700 hover:bg-soft-gray hover:text-red-500 transition-colors duration-200 rounded-md"
              >
                Cerrar sesión
              </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
