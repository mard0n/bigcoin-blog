import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient, Entry } from "contentful";

import Head from "next/head";
import { Article } from "../types";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeBanner from "../components/HomeBanner";
import HomeArticleCard from "../components/HomeArticleCard";
import HomeFilterTags from "../components/HomeFilterTags";
import { useRouter } from "next/router";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
});

const ArticleNotFound = () => {
  return (
    <div className="text-center my-10 h-[calc(100vh-400px)]">
      <div className="text-9xl text-[#5A7184] mb-5">Oops!</div>
      <div className="text-xl">No articles found with this name</div>
    </div>
  );
};

interface HomeProps {
  articles: Entry<Article>[] | undefined;
}

const Home: NextPage<HomeProps> = ({ articles = [] }) => {
  const t = useTranslations("Home");
  const router = useRouter();
  const { tag } = router.query;
  console.log("router.query", router.query);

  const elemToScrollToOnSearch = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  console.log("selectedTag", selectedTag);

  useEffect(() => {
    setSelectedTag(tag as string);
  }, [tag]);

  const handleSearchOnChange = (value: string) => {
    setSelectedTag("");
    setSearchValue(value);
  };
  const handleTagSelect = (value: string) => {
    setSearchValue("");
    if (selectedTag === value) {
      setSelectedTag("");
    } else {
      setSelectedTag(value);
    }
  };

  const filteredArticles = articles.filter((article) => {
    // console.log("searchValue", searchValue);
    // console.log("selectedTag", selectedTag);
    if (searchValue) {
      return article.fields.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    } else if (selectedTag) {
      return article.fields.tags.includes(selectedTag);
    } else {
      return true;
    }
  });
  // console.log("filteredArticles?.length", filteredArticles?.length);
  // console.log("filteredArticles", filteredArticles);
  const tags = [
    ...new Set(articles.map((article) => article.fields.tags).flat()),
  ];
  return (
    <div>
      <Head>
        <title>CoinMena Blog</title>
        <meta
          name="keywords"
          content="Blockchain Crypto Exchange, Cryptocurrency Exchange, Bitcoin Trading, Ethereum price trend, XRP, CHZ, BTC price, ETH, LTC price, CoinMENA"
        ></meta>
        <meta
          name="description"
          content="CoinMENA is the fastest growing exchange for retail and institutional clients to buy and sell digital assets such as Bitcoin, Ethereum, and top altcoins in local currencies. Sign up and start trading today!"
        />
        <meta property="og:title" content={"CoinMena Blog"} />
        <meta property="og:type" content={"website"} />
        <meta property="og:image" content={"/ogimage.png"} />
        <meta
          property="og:description"
          content={
            "CoinMENA is the fastest growing exchange for retail and institutional clients to buy and sell digital assets such as Bitcoin, Ethereum, and top altcoins in local currencies. Sign up and start trading today!"
          }
        />
        <meta property="og:url" content={"https://www.coinmena.com"} />
        <meta property="og:locale" content={router.locale} />
        {router.locales?.map((locale) => (
          <meta key={locale} property="og:locale:alternate" content={locale} />
        ))}
        <meta property="og:site_name" content="CoinMENA" />
        <meta property="twitter:title" content="CoinMena Blog" />
        <meta
          property="twitter:description"
          content="CoinMENA is the fastest growing exchange for retail and institutional clients to buy and sell digital assets such as Bitcoin, Ethereum, and top altcoins in local currencies. Sign up and start trading today!"
        />
        <meta property="twitter:image" content="/ogimage.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="CoinMENA" />
        <meta property="twitter:url" content="https://www.coinmena.com" />
      </Head>
      <header>
        <Navbar />
        <HomeBanner
          searchValue={searchValue}
          handleOnChange={handleSearchOnChange}
          elemToScrollTo={elemToScrollToOnSearch}
        />
      </header>

      <main>
        <HomeFilterTags
          tags={tags}
          selectedTag={selectedTag}
          handleOnSelect={handleTagSelect}
        />
        {filteredArticles?.length ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 py-16 container"
            ref={elemToScrollToOnSearch}
          >
            {filteredArticles.map((article, index) => {
              return (
                <HomeArticleCard
                  key={article.sys.id}
                  cardImageSrc={
                    "https:" + article.fields?.thumbnail.fields.file.url
                  }
                  articleLink={"/articles/" + article.sys.id}
                  title={article.fields?.title}
                  description={article.fields?.description}
                  authorName={article.fields?.authorName}
                  authorImage={
                    "https:" + article.fields?.authorImage?.fields.file.url
                  }
                  editDate={article.fields?.editDate}
                />
              );
            })}
          </div>
        ) : (
          <div ref={elemToScrollToOnSearch}>
            <ArticleNotFound />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  try {
    const res = await client.getEntries<Article>({
      content_type: "coinmenaBlog",
      locale,
    });

    return {
      props: {
        locale,
        messages: (await import(`../lang/${locale}.json`)).default,
        articles: res.items,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Home;
