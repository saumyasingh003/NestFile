import React from "react";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi"; // Importing the sign-out icon
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <div className="hidden sm:block fixed w-[84%] z-50">
      <header className="flex items-center justify-between px-6 py-4  bg-[#D2BF55] shadow-md  ">
        <div className="flex-shrink-0">
          <Search />
        </div>

        <div className="flex items-center space-x-4">
          <FileUploader ownerId={userId} accountId={accountId} />

          <form
            action={async () => {
              "use server";

              await signOutUser();
            }}
          >
            <Button
              type="submit"
              className="flex items-center justify-center p-4 bg-red-700 text-white  shadow-lg hover:bg-[#F7B32B] transition duration-300"
            >
              <FiLogOut className="w-6 h-6 text-white" />{" "}
            </Button>
          </form>
        </div>
      </header>
    </div>
  );
};

export default Header;
