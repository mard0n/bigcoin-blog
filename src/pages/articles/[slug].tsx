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
import { Blog } from "../../types";
import { ReactNode } from "react";
import ArticleImage from "../../components/ArticleImage";
import ArticleBanner from "../../components/ArticleBanner";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
});

interface ArticleProps {
  blog: Entry<Blog> | undefined;
}

const Article: NextPage<ArticleProps> = ({ blog }) => {
  const t = useTranslations("Home");
  console.log("blog", blog);

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
        console.log("children", children);

        return (
          <div className="article-text-container pb-8 min-h-1">
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

  return (
    <>
      <header>
        <Navbar />
        <ArticleBanner
          mainTag={blog?.fields.tags[0]}
          title={blog?.fields.title}
          description={blog?.fields.description}
          bgImgSrc={"https:" + blog?.fields.thumbnail.fields.file.url}
          bgImgAlt={blog?.fields.thumbnail.fields.title}
        />
      </header>
      <main className="py-16">
        {blog?.fields?.content &&
          documentToReactComponents(
            blog?.fields?.content as any,
            contentRenderOptions
          )}
      </main>
      <Footer />
    </>
  );
};

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const res = await client.getEntries<Blog>({
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
  console.log("params", params);

  const id = params
    ? !Array.isArray(params.slug)
      ? params.slug || ""
      : ""
    : "";
  try {
    const res = await client.getEntry<Blog>(id, {
      locale,
    });

    return {
      props: {
        locale,
        messages: (await import(`../../lang/${locale}.json`)).default,
        blog: res,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Article;
