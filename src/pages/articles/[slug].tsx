import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useTranslations } from "next-intl";
import { createClient, Entry } from "contentful";
import { BLOCKS, Block, Inline } from "@contentful/rich-text-types";

import Head from "next/head";
import Image from "next/image";
import { Article } from "../../types";
import { ReactNode, useEffect, useState } from "react";
import ArticleImage from "../../components/ArticleImage";
import ArticleBanner from "../../components/ArticleBanner";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AuthorCard from "../../components/AuthorCard";
import Link from "next/link";
import RelatedArticles from "../../components/RelatedArticles";
import { useRouter } from "next/router";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
});

interface ArticleProps {
  article: Entry<Article> | undefined;
  articles: Entry<Article>[] | undefined;
}

const Article: NextPage<ArticleProps> = (props) => {
  const t = useTranslations("Home");
  const { article, articles } = props;
  console.log("props", props);

  const contentRenderOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
        return (
          <div className="article-text-container pb-8">
            <h2 className="text-2xl font-bold text-[#262D33]">{children}</h2>
          </div>
        );
      },
      [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
        return (
          <div className="article-text-container pb-8">
            <h3 className="text-xl font-bold text-[#262D33]">{children}</h3>
          </div>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => {
        return (
          <div className="article-text-container pb-8 last:pb-0 min-h-1">
            <p className="text-lg text-[#4B5157]">{children}</p>
          </div>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const { title, description, file } = node.data.target.fields;
        return (
          <ArticleImage
            imgSrc={"https:" + file.url}
            title={title}
            description={description}
          />
        );
      },
    },
  };
  const {
    authorName,
    authorImage,
    title,
    description,
    thumbnail,
    tags,
    content,
  } = article?.fields || {};
  console.log("article", article);

  return (
    <>
      <header>
        <Navbar />
        <ArticleBanner
          mainTag={tags && tags[0]}
          title={title}
          description={description}
          bgImgSrc={
            thumbnail?.fields.file.url && "https:" + thumbnail?.fields.file.url
          }
          bgImgAlt={thumbnail?.fields.title}
        />
      </header>
      <main className="pt-16">
        {authorName && authorImage && (
          <div className="relative article-text-container hidden xl:block">
            {/* TODO: ask the design for better place to put on mobile*/}
            <div className="absolute right-0">
              <div className="mt-[calc(-50%-52px)]">
                <AuthorCard
                  authorName={authorName}
                  authorImage={
                    authorImage.fields.file.url &&
                    "https:" + authorImage.fields.file.url
                  }
                />
              </div>
            </div>
          </div>
        )}
        {content && (
          <div>
            {documentToReactComponents(content as any, contentRenderOptions)}
          </div>
        )}
        {tags && (
          <div className="flex article-text-container my-8">
            {tags.map((tag) => (
              <Link key={tag} href={`/?tag=${tag}`}>
                <a>
                  <div className="mr-2 py-1 px-4 border rounded border-[#D9DADB] text-sm">
                    {tag}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}
        {articles?.length && article && (
          <RelatedArticles articles={articles} currentArticle={article} />
        )}
      </main>
      <Footer />
    </>
  );
};

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const res = await client.getEntries<Article>({
    content_type: "coinmenaBlog",
  });
  const paths = res.items
    .map((article) => {
      if (locales && locales.length) {
        return locales.map((locale) => {
          return {
            params: { slug: article.sys.id }, //TODO: figure out the to pass id and slug
            locale,
          };
        });
      } else {
        return [
          {
            params: { slug: article.sys.id },
          },
        ];
      }
    })
    .flat();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  // console.log("params", params);

  const id = params
    ? !Array.isArray(params.slug)
      ? params.slug || ""
      : ""
    : "";
  try {
    const articles = await client.getEntries<Article>({
      content_type: "coinmenaBlog",
      locale,
    });
    console.log("static articles", articles);

    const article = articles.items.find((article) => article.sys.id === id);
    console.log("static article", article);

    return {
      props: {
        locale,
        messages: (await import(`../../lang/${locale}.json`)).default,
        article: article,
        articles: articles.items,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Article;
