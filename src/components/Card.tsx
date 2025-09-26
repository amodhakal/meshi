/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MdOutlineBookmarkBorder } from "react-icons/md";

export type CardProps = {
  data: { imageUrl: string; title: string; creatorId: string; link: string };
};

export default async function Card({ data }: CardProps) {
  const { imageUrl, title, creatorId, link } = data;
  // const client = await clerkClient();
  // const creator = await client.users.getUser(creatorId);

  return (
    <div className="shadow rounded-xl max-w-96">
      <Link href={link}>
        <img
          src={imageUrl}
          alt="A thumbnail for a 3d design"
          className="w-full rounded-xl rounded-b-none"
        />
      </Link>
      <div className="p-4 flex gap-4 justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-lg">{title}</p>
        </div>
        <div className="">
          <MdOutlineBookmarkBorder className="text-xl hover:scale-105 hover:cursor-pointer active:scale-95" />
        </div>
      </div>
    </div>
  );
}
