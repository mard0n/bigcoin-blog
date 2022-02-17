import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface ArticleBannerProps {
  mainTag: string | undefined;
  title: string | undefined;
  description: string | undefined;
  bgImgSrc: string | undefined;
  bgImgAlt: string | undefined;
}

const ArticleBanner: NextPage<ArticleBannerProps> = ({
  mainTag,
  title,
  description,
  bgImgSrc,
  bgImgAlt,
}) => {
  const t = useTranslations("Article");

  return (
    <div className="relative text-white">
      <div className="absolute z-[-1] inset-0 brightness-50">
        {bgImgSrc && (
          <Image
            src={bgImgSrc}
            alt={bgImgAlt}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className="pt-16 pb-32">
        <div className="flex justify-between items-center article-text-container xl:px-0 mb-11">
          <Link href={`/?tag=${mainTag}`}>
            <a>
              <div className="text-[#FF8215]">{mainTag}</div>
            </a>
          </Link>
          <Link href="/">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block align-bottom"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>{" "}
              <span className="text-sm">{t("backToMain")}</span>
            </a>
          </Link>
        </div>
        <div>
          <h1 className="article-text-container text-[4rem] font-bold leading-[1.1875] mb-2">
            {title}
          </h1>
          <p className="article-text-container text-[1.125rem] leading-[1.67] opacity-[85%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleBanner;
