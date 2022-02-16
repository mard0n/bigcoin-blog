import { NextPage } from "next";
import Image from "next/image";
import style from "./ArticleImage.module.css";

interface ArticleImageProps {
  imgSrc: string;
  title: string;
  description: string;
}

const ArticleImage: NextPage<ArticleImageProps> = ({
  imgSrc,
  title,
  description,
}) => {
  return (
    <div className="container">
      <figure className="rounded-md ring-1 ring-[#D9DADB]">
        <div className={style["img-container"]}>
          <Image src={imgSrc} alt={title} layout="fill" objectFit="cover" />
        </div>
        <figcaption className="px-8 py-6 text-sm text-[#4B5157]">
          {description}
        </figcaption>
      </figure>
    </div>
  );
};

export default ArticleImage;
