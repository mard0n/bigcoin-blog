import { NextPage } from "next";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import style from "./Card.module.css";

interface CardProps {
  cardImageSrc: string;
  articleLink: string;
  title: string;
  description: string;
  authorName: string | undefined;
  authorImage: string | undefined;
  editDate: string | undefined;
}

const Card: NextPage<CardProps> = ({
  cardImageSrc,
  articleLink,
  title,
  description,
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
    <div
      className={`rounded-xl overflow-hidden shadow-[0_15px_25px_rgba(0,0,0,0.06)] ${style["animate-card-entrance"]}`}
    >
      <Link href={articleLink}>
        <a>
          <div className="w-full h-[150px] lg:h-[250px] relative">
            <Image
              src={cardImageSrc}
              alt="test"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </a>
      </Link>
      <div className="px-6 lg:px-12 py-6 lg:py-8">
        <Link href={articleLink}>
          <a>
            <h1 className="text-[1.75rem] leading-[1.14] tracking-tight font-semibold mb-[20px] text-[#183B56]">
              {title}
            </h1>
          </a>
        </Link>
        <p className="text-[#183B56] max-h-[72px] line-clamp-3 mb-8">
          {description}
        </p>
        <div className="flex justify-between items-center">
          {authorName && authorImage ? (
            <div className="grid grid-flow-col gap-5 items-center">
              <Image
                src={authorImage}
                className="rounded-full"
                alt="author's image"
                height={40}
                width={40}
              />
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
