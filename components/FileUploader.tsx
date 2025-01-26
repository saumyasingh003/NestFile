"use client";

import React, { useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FaSpinner } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );

          return toast({
            description: (
              <p className="body-2 text-gray-800">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          });
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
            }
          }
        );
      });

      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
    <input {...getInputProps()} />
      <Button type="button" className="bg-[#058C42] hover:bg-[#16DB65] flex items-center gap-2">
      <FaCloudUploadAlt size={24} className="text-white" />
      <p>Upload</p>
    </Button>
    {files.length > 0 && (
      <>
        {/* Modal at the bottom right */}
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-fit">
          <h4 className="text-lg font-semibold text-gray-700 mb-2">Uploading Files</h4>
          <ul className="uploader-preview-list space-y-4">
            {files.map((file, index) => {
              const { type, extension } = getFileType(file.name);
  
              return (
                <li
                  key={`${file.name}-${index}`}
                  className="uploader-preview-item relative p-4 bg-gray-100 rounded-lg shadow-sm flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Thumbnail
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                    />
                    <div className="flex-grow flex justify-between gap-3 items-center">
                      <div className="preview-item-name text-gray-800 font-medium text-wrap">
                        {file.name}
                      </div>
                      <FaSpinner
                        size={26}
                        className="animate-spin text-gray-500"
                      />
                    </div>
                  </div>
                  <Image
                    src="/assets/remove.webp"
                    width={24}
                    height={24}
                    alt="Remove"
                    onClick={(e) => handleRemoveFile(e, file.name)}
                    className="cursor-pointer text-red-500"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </>
    )}
  </div>
  
  );
};

export default FileUploader;
