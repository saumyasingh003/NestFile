"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
  children: React.ReactNode;
}

import { AiOutlineDashboard, AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai";
import { FaRegImage, FaRegPlayCircle } from "react-icons/fa";

export const navItems = [
  { name: "Dashboard", icon: <AiOutlineDashboard size={24} />, url: "/" },
  { name: "Documents", icon: <AiOutlineFileText size={24} />, url: "/documents" },
  { name: "Images", icon: <FaRegImage size={24} />, url: "/images" },
  { name: "Media", icon: <FaRegPlayCircle size={24} />, url: "/media" },
  { name: "Others", icon: <AiOutlineFolderOpen size={24} />, url: "/others" },
];

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between gap-10">

    <aside className=" flex-col justify-between h-screen bg-[#D2BF55] shadow-lg p-4 lg:w-64 w-20  hidden lg:block fixed">
      {/* Logo */}
      <div className="mb-6 flex justify-center lg:justify-start">
        <Link href="/" className="flex justify-center items-center w-full">
          <Image
            src="/assets/main.png"
            alt="logo"
            width={80}
            height={30}
            className="hidden lg:block h-auto transition-transform duration-300 hover:rotate-6 hover:scale-105"
          />
          <Image
            src="/assets/main.png"
            alt="logo"
            width={52}
            height={52}
            className="lg:hidden transition-transform duration-300 hover:rotate-6 hover:scale-105"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <li key={name} className="w-full">
              <Link
                href={url}
                className={`flex items-center gap-4 p-3 rounded-lg text-lg font-bold transition-colors duration-200 
                  ${
                    pathname === url
                      ? "bg-[#15803D] text-white shadow-md"
                      : "text-[#15803D] hover:bg-gray-300 hover:text-black"
                  }`}
              >
                <div
                  className={`p-2 rounded-md transition-all duration-300 ${
                    pathname === url ? "bg-[#F7B32B]" : "bg-[#F5F5DC]"
                  }`}
                >
                  {icon}
                </div>
                <p className="hidden lg:block">{name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 w-full flex    p-4 ">
  <Image
    src="/assets/avatar"
    alt="Avatar"
    width={44}
    height={44}
    className="rounded-full border-2 border-[#15803D]"
  />
  <div className="hidden lg:block ">
    <p className="text-sm font-semibold text-red-600 capitalize">
      {fullName}
    </p>
    <p className="text-xs text-gray-700">{email}</p>
  </div>
</div>

    </aside>
 
    </div>
  );
};

export default Sidebar;
