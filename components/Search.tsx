"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${
        file.type === "video" || file.type === "audio"
          ? "media"
          : file.type + "s"
      }?query=${query}`
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-[26em] bg-white ">
        <Image src="/assets/search.svg" alt="Search" width={24} height={24} />
        <Input
          value={query}
          placeholder="Search..."
          className="bg-transparent border-none focus:ring-0 text-black placeholder-gray-400 w-full"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {open && (
        <ul className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((file) => (
              <li
                key={file.$id}
                className="flex items-center justify-between px-4 py-2 text-black hover:bg-gray-200 cursor-pointer"
                onClick={() => handleClickItem(file)}
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={file.type}
                    extension={file.extension}
                    url={file.url}
                    className="w-10 h-10"
                  />
                  <p className="text-black text-sm truncate">
                    {file.name.length > 10
                      ? `${file.name.substring(0, 25)}...`
                      : file.name}
                  </p>
                </div>
                <FormattedDateTime
                  date={file.$createdAt}
                  className="text-gray-400 text-xs"
                />
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400 text-sm">No files found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
