import { Entry } from "contentful";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Article } from "../../types";

interface RelatedArticlesProps {
  articles: Entry<Article>[];
  currentArticle: Entry<Article>;
  numberOfAticlesToShow?: number;
}

const RelatedArticles: NextPage<RelatedArticlesProps> = ({
  articles,
  currentArticle,
  numberOfAticlesToShow = 4,
}) => {
  const articlesWithoutCurrentArticle = articles.filter(
    (article) => article.sys.id !== currentArticle.sys.id
  );
  return (
    <div className="bg-[#F5F5F5]">
      <div className="container py-16 overflow-scroll flex gap-8">
        {articlesWithoutCurrentArticle.map((article, index) => {
          const { thumbnail, title } = article.fields || {};
          if (index + 1 < numberOfAticlesToShow) {
            return (
              <div className="w-[260px] inline-block" key={article.sys.id}>
                <Link href={"/articles/" + article.sys.id}>
                  <a>
                    {thumbnail && (
                      <div className="relative w-[260px] h-[180px] rounded-lg overflow-hidden">
                        <Image
                          src={"https://" + thumbnail.fields.file.url}
                          alt={thumbnail.fields.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="leading-6 font-bold mt-2">{title}</div>
                  </a>
                </Link>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default RelatedArticles;
