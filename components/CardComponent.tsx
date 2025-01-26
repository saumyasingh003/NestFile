import { Models } from "node-appwrite";
import Link from "next/link";

import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Card, CardHeader, CardDescription } from "@/components/ui/card";
import ActionDropdown from "./ActionDropdown";

const CardComponent = ({ file }: { file: Models.Document }) => {
  return (
    <div className="w-66 mb-3">
      <Card className="bg-[#dc9590] rounded-xl  p-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Thumbnail
              type={file.type}
              extension={file.extension}
              url={file.url}
              className="w-16 h-16 rounded-full bg-white " 
              imageClassName="w-16 h-16 rounded-full" 
            />

            <div className="flex flex-col items-end justify-between space-y-2">
          
              <ActionDropdown file={file}/>
              <p className="text-sm text-white">
                {convertFileSize(file.size)}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardDescription>
          <Link href={file.url} target="_blank">
            <div>
              <p className="text-lg font-semibold text-white line-clamp-1">
                {file.name}
              </p>
              <FormattedDateTime
                date={file.$createdAt}
                className="text-sm text-black"
              />
              <p className="text-xs text-white line-clamp-1">
                By: {file.owner.fullName}
              </p>
            </div>
          </Link>
        </CardDescription>
      </Card>
    </div>
  );
};

export default CardComponent;
