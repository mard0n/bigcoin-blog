import { NextPage } from "next";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";

interface CardProps {
  cardImageSrc: string;
  articleLink: string;
  title: string;
  desc: string;
  authorName: string | undefined;
  authorImage: string | undefined;
  editDate: string | undefined;
}

const Card: NextPage<CardProps> = ({
  cardImageSrc,
  articleLink,
  title,
  desc,
  authorName,
  authorImage,
  editDate,
}) => {
  let formatedDate = useMemo(() => {
    if (editDate) {
      if (dayjs(editDate).isValid()) {
        return dayjs(editDate).format("DD MMM");
      }
    }
    return null;
  }, [editDate]);

  return (
    <div className="rounded-xl overflow-hidden shadow-[0_15px_25px_rgba(0,0,0,0.06)]">
      <Link href={articleLink}>
        <a>
          <div className="w-full h-[250px] relative">
            <Image
              src={cardImageSrc}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </a>
      </Link>
      <div className="px-12 py-8">
        <Link href={articleLink}>
          <a>
            <h1 className="text-[28px] leading-[1.14] tracking-tight font-semibold mb-[20px] text-[#183B56]">
              {title}
            </h1>
          </a>
        </Link>
        <p className="text-[#183B56] max-h-[72px] line-clamp-3 mb-8">{desc}</p>
        <div className="flex justify-between items-center">
          {authorName && authorImage ? (
            <div className="flex items-center">
              <div className="mr-10">
                <Image
                  src={authorImage}
                  className="rounded-full"
                  alt="author's image"
                  height={40}
                  width={40}
                />
              </div>
              <div>
                <div className="text-[#183B56]">{authorName}</div>
                <div className="text-[#5A7184] italic text-sm">
                  Verified Author
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}
          {formatedDate && <div className="text-[#5A7184]">{formatedDate}</div>}
        </div>
      </div>
    </div>
  );
};
export default Card;
