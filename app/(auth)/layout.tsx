import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen dotted-background">
      {/* Left Section */}
      <section className="hidden lg:flex w-full lg:w-1/2 xl:w-2/5 items-center justify-center bg-gradient-to-b from-green-700 to-green-500 p-10">
        <div className="max-w-sm flex flex-col items-center space-y-6 text-center">
          {/* Headline */}
          <div className="text-[#2D1E2F]">
            <h1
              className="text-4xl lg:text-5xl font-bold leading-snug text-white"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
            >
              NextFile!
            </h1>
            <p className="mt-4 text-base lg:text-lg text-gray-100">
              Your personal hub for storing and managing all your documents in
              one place.
            </p>
          </div>

          {/* Decorative Image */}
          <Image
            src="/assets/main.png"
            alt="Illustration of file storage"
            width={348}
            height={350}
            className="transition-transform duration-300 hover:rotate-6 hover:scale-105 max-w-full h-auto"
          />
        </div>
      </section>

      {/* Right Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-8 lg:px-10 space-y-6 lg:space-y-8">
  {/* Mobile Logo */}
  <div className="lg:hidden "> {/* Added bottom margin for finer control */}
    <Image
      src="/assets/main.png"
      alt="Mobile Application Logo"
      width={224}
      height={92}
      className="h-auto w-36 sm:w-48 transition-transform duration-300 hover:rotate-6 hover:scale-105"
    />
  </div>

  {/* Dynamic Content */}
  <div className="w-full max-w-md "> {/* Reduced spacing for mobile */}
    {children}
  </div>
</section>

    </div>
  );
};

export default Layout;
