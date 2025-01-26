import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex">
    <Sidebar {...currentUser} />
    <section className="flex flex-col w-full lg:pl-64"> 
      <MobileNavigation {...currentUser} />
      <div className="">

      <Header userId={currentUser.$id} accountId={currentUser.accountId} />
      </div>
      <div className="main-content p-4 relative md:top-20">{children}</div> 
    </section>
    <Toaster />
  </main>
  
  );
};
export default Layout;
