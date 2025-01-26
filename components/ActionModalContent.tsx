import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
<div className="file-details-thumbnail flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
  <Thumbnail
    type={file.type}
    extension={file.extension}
    url={file.url}
    className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0"
    imageClassName="rounded-lg"
  />
  <div className="flex flex-col justify-center">
    <p className="text-lg font-semibold text-gray-800 line-clamp-1">{file.name}</p>
    <FormattedDateTime date={file.$createdAt} className="text-sm text-gray-500" />
  </div>
</div>

);


  
const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-2 gap-x-4 py-2"> {/* Grid layout for table-like alignment */}
      <p className="file-details-label text-left font-medium">{label}</p>
      <p className="file-details-value text-left">{value}</p>
    </div>
  );
  
  export const FileDetails = ({ file }: { file: Models.Document }) => {
    return (
      <>
        <ImageThumbnail file={file} />
        <div className="px-4 pt-4 space-y-2"> {/* Vertical spacing between rows */}
          <DetailRow label="Format:" value={file.extension} />
          <DetailRow label="Size:" value={convertFileSize(file.size)} />
          <DetailRow label="Owner:" value={file.owner.fullName} />
          <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
        </div>
      </>
    );
  };
  
  

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="subtitle-2">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="share-remove-user bg-white"
                >
                 <FaTrash className="text-red-500 cursor-pointer w-6 h-6 hover:text-red-700 " />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
