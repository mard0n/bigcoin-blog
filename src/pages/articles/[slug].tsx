import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { useTranslations } from "next-intl";
import { createClient, Entry } from "contentful";

import Head from "next/head";
import Image from "next/image";
import { Blog } from "../../types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
});

interface ArticleProps {
  blog: Entry<Blog>;
}

const Article: NextPage<ArticleProps> = ({ blog }) => {
  console.log("blog", blog);

  const t = useTranslations("Home");
  return <div>{blog?.fields?.title}</div>;
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
