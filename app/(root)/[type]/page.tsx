import Sort from "@/components/Sort";
import React from "react";
import { Models } from "node-appwrite";
import { getFiles } from "@/lib/actions/file.actions";
import CardComponent from "@/components/CardComponent";
import { Card } from "@/components/ui/card";
import { getFileTypesParams, getUsageSummary } from "@/lib/utils";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
   const searchText = ((await searchParams)?.query as string) || "";
   const sort = ((await searchParams)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({types ,searchText , sort});



  return (
    <div className="min-h-screen    px-4">
      <section className="w-full p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold capitalize text-[#DB4C40] text-center sm:text-left">
          {type}..
        </h1>

        <div className="mt-6 flex flex-row justify-between items-center gap-4">
          {/* Total size section */}
          <p className="text-lg text-gray-700 font-medium flex items-center">
            Total:{" "}
            <span className="text-xl  font-bold text-[#DB4C40]">2GB</span>
          </p>

          {/* Sort by section */}
          <div className="flex items-center sm:ml-0 sm:mt-0 sm:justify-end w-32 sm:w-44 ">
            <p className="text-sm text-gray-500 mr-2" >Sort: {" "}</p>
            <Sort />
          </div>
        </div>
      </section>

      {files?.documents?.length > 0 ? (
        <section className="file-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-4 mt-0 justify-center">
          {files.documents.map((file: Models.Document) => (
            <CardComponent key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="text-center text-gray-500 mt-6">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
