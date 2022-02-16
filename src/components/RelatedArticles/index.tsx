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
      <div className="container py-16">
        {articlesWithoutCurrentArticle.map((article, index) => {
          const { thumbnail, title } = article.fields || {};
          if (index + 1 < numberOfAticlesToShow) {
            return (
              <Link href={"/articles/" + article.sys.id}>
                <a>
                  <div key={article.sys.id} className="w-[260px]">
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
                  </div>
                </a>
              </Link>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default RelatedArticles;
