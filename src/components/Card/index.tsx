import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  cardImageSrc: string;
  articleLink: string;
  title: string;
  desc: string;
}

const Card: NextPage<CardProps> = ({
  cardImageSrc,
  articleLink,
  title,
  desc,
}) => {
  return (
    <div>
      <Link href={articleLink}>
        <a>
          <Image src={cardImageSrc} alt="test" height={500} width={1000} />
        </a>
      </Link>
      <Link href={articleLink}>
        <a><h1 className="text-4xl">{title}</h1></a>
      </Link>
      <p>{desc}</p>
    </div>
  );
};
export default Card;
