"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

import {
  AiOutlineDashboard,
  AiOutlineFileText,
  AiOutlineFolderOpen,
} from "react-icons/ai";
import { FaRegImage, FaRegPlayCircle } from "react-icons/fa";
import { Separator } from "@radix-ui/react-separator";

export const navItems = [
  {
    name: "Dashboard",
    icon: <AiOutlineDashboard size={24} className="text-green-700" />,
    url: "/",
  },
  {
    name: "Documents",
    icon: <AiOutlineFileText size={24} className="text-green-700" />,
    url: "/documents",
  },
  {
    name: "Images",
    icon: <FaRegImage size={24} className="text-green-700" />,
    url: "/images",
  },
  {
    name: "Media",
    icon: <FaRegPlayCircle size={24} className="text-green-700" />,
    url: "/media",
  },
  {
    name: "Others",
    icon: <AiOutlineFolderOpen size={24} className="text-green-700" />,
    url: "/others",
  },
];

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setOpen(!open); // Toggle the sidebar open state

  return (
    <header className="mobile-header flex items-center justify-between ">
      <div className="block lg:hidden">
        {/* Logo */}
        <Image
          src="/assets/main.png"
          alt="logo"
          width={70} 
          height={70} 
          className="h-auto mr-20 ml-5 "
        />
      </div>

      {/* Hamburger Icon */}
      <div
        className="hamburger-icon p-2 bg-[#D2BF55] rounded-full cursor-pointer ml-36 block lg:hidden"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu size={32} className="text-[#15803D]" />
      </div>

      {/* Sidebar (Sheet) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger />
        <SheetContent className="shad-sheet h-screen px-3 bg-[#F5F5DC]">
          <SheetTitle>
            <div className="header-user flex items-center gap-3 p-4 rounded-lg mb-4">
              <Image
                src="/assets/avatar2.png"
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar rounded-full"
              />
              <div className="text-[#15803D]">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption text-sm">{email}</p>
              </div>
            </div>
          </SheetTitle>

          <Separator className="mb-4 bg-light-200/20" />

          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url}>
                  <li
                    className={cn(
                      "mobile-nav-item p-4 flex items-center gap-3",
                      pathname === url &&
                        "shad-active bg-[#D2BF55] rounded-2xl text-[#15803D]"
                    )}
                  >
                    <div
                      className={cn(
                        "nav-icon-container",
                        pathname === url && "nav-icon-active"
                      )}
                    >
                      {icon}
                    </div>
                    <p className="text-[#15803D]">{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-center items-center gap-5 pb-5">
            {/* Add items-center to center the children horizontally */}
            <FileUploader ownerId={ownerId} accountId={accountId}/>
            <Button
              type="submit"
              className="mobile-sign-out-button bg-red-600 justify-center w-24 text-white p-4 rounded-lg"
              onClick={async () => await signOutUser()}
            >
              <FiLogOut size={24} />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
