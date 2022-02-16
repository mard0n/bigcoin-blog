import { NextPage } from "next";
import Image from "next/image";

interface AuthorCardProps {
  authorImage: string;
  authorName: string;
}

const AuthorCard: NextPage<AuthorCardProps> = ({ authorImage, authorName }) => {
  return (
    <div className="text-center w-[264px] px-6 py-9 inline-block border border-[#D9DADB] rounded-lg bg-white">
      <Image
        src={authorImage}
        alt={authorName}
        width="90"
        height="90"
        className="rounded-full mb-4"
      />
      <div className="text-[#262D33] text-[1.25rem] leading-6 font-bold mb-1">
        {authorName}
      </div>
      <div className="text-[#4B5157] text-sm mb-4">
        Writer at CoinMena
      </div>
      <div className="text-[#262D33] text-sm font-semibold">
        82 articles
      </div>
      {/* <div className="flex">
        <div className="rounded-full">F</div>
        <div className="rounded-full">T</div>
        <div className="rounded-full">I</div>
      </div> */}
    </div>
  );
};

export default AuthorCard;
