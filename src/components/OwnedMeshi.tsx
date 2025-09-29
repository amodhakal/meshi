import { clerkClient } from "@clerk/nextjs/server";
import { OwnedMeshiType } from "../../convex/query";
import { MdDownload, MdMessage } from "react-icons/md";
import { IoMdEye, IoMdStarOutline } from "react-icons/io";

type Props = {
  ownedMeshi: OwnedMeshiType;
};

export default async function OwnedMeshi({ ownedMeshi }: Props) {
  const creator = await (
    await clerkClient()
  ).users.getUser(ownedMeshi.creatorId);
  return (
    <div className="shadow rounded-lg bg-gray-50 max-w-80">
      <img
        src={ownedMeshi.thumbnailUrl}
        alt={ownedMeshi.description || `The thumbnail of ${ownedMeshi.title}`}
        className="rounded-lg rounded-b-none aspect-video object-cover"
      />
      <div className="p-4 flex gap-4 items-center">
        <img
          src={creator.imageUrl}
          alt={`Profile picture of ${creator.username}`}
          className="aspect-square w-8 rounded-full"
        />
        <div className="flex-col overflow-hidden">
          <div className="">
            <p className="truncate font-bold">{ownedMeshi.title}</p>
          </div>
          {/* <div className="flex flex-end">
            <IoMdEye />
            <MdMessage />
            <IoMdStarOutline />
            <MdDownload />
          </div> */}
        </div>
      </div>
    </div>
  );
}
