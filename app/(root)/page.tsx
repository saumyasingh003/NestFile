import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";
import { FaRegFileAlt, FaCalendarAlt } from "react-icons/fa";
import ActionDropdown from "@/components/ActionDropdown";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container p-6 lg:p-10 bg-gray-100 min-h-screen">
      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Usage Summary Section */}

        <section className="flex-1 space-y-6 w-full">
          <h2 className="text-2xl font-bold text-gray-800">Usage Summary</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {usageSummary.map((summary) => (
              <Link
                href={summary.url}
                key={summary.title}
                className="dashboard-summary-card bg-[#15803D] shadow-xl hover:shadow-2xl rounded-lg p-6 transition-shadow duration-300 transform hover:scale-105"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center gap-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={summary.icon}
                        layout="fill"
                        objectFit="contain"
                        alt="Uploaded image"
                        className="rounded-full"
                      />
                      {/* You can add a subtle shadow or border around the image if needed */}
                      <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
                    </div>
                    <h4 className="text-xl font-semibold text-white">
                      {convertFileSize(summary.size) || 0}
                    </h4>
                  </div>

                  <h5 className="text-lg font-medium text-white flex items-center gap-2">
                    {/* Adding an appropriate icon for each card */}
                    <FaRegFileAlt className="text-white" />
                    {summary.title}
                  </h5>
                  <Separator className="bg-gray-300" />
                  <div className="flex items-center justify-between">
                    <FormattedDateTime
                      date={summary.latestDate}
                      className="text-sm text-white text-center"
                    />
                    <FaCalendarAlt className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </section>

        {/* Recent Files Section */}
        <section className="flex-none w-full max-w-[400px] ml-auto space-y-6 sm:w-[350px] md:w-[400px]">
  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Files</h2>
  {files.documents.length > 0 ? (
    <ul className="flex flex-col gap-4 sm:gap-6">
      {files.documents.map((file: Models.Document) => (
        <Link
          href={file.url}
          target="_blank"
          className="flex items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          key={file.$id}
        >
          <Thumbnail
            type={file.type}
            extension={file.extension}
            url={file.url}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col">
              <p className="text-black text-sm truncate">
                {file.name.length > 10
                  ? `${file.name.substring(0, 25)}...`
                  : file.name}
              </p>
              <FormattedDateTime
                date={file.$createdAt}
                className="text-sm text-gray-500"
              />
            </div>
            <ActionDropdown file={file} />
          </div>
        </Link>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500 text-center">No files uploaded</p>
  )}
</section>

      </div>
    </div>
  );
};

export default Dashboard;
