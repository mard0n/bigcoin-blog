import type { GetStaticPropsContext, NextPage } from "next";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { createClient, Entry } from "contentful";

import Head from "next/head";
import { Blog } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Tags from "../components/Tags";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
});

const BlogNotFound = () => {
  return (
    <div className="text-center my-10 h-[calc(100vh-400px)]">
      <div className="text-9xl text-[#5A7184] mb-5">Oops!</div>
      <div className="text-xl">No articles found with this name</div>
    </div>
  );
};

interface HomeProps {
  blogs: Entry<Blog>[];
}

const Home: NextPage<HomeProps> = ({ blogs }) => {
  const t = useTranslations("Home");
  const elemToScrollToOnSearch = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

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

  const filteredBlogs = blogs.filter((blog) => {
    // console.log("searchValue", searchValue);
    // console.log("selectedTag", selectedTag);

    if (searchValue) {
      return blog.fields.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    } else if (selectedTag) {
      return blog.fields.tags.includes(selectedTag);
    } else {
      return true;
    }
  });
  // console.log("filteredBlogs?.length", filteredBlogs?.length);
  // console.log("filteredBlogs", filteredBlogs);
  const tags = [...new Set(blogs.map((blog) => blog.fields.tags).flat())];
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <Banner
          searchValue={searchValue}
          handleOnChange={handleSearchOnChange}
          elemToScrollTo={elemToScrollToOnSearch}
        />
        <Tags
          tags={tags}
          selectedTag={selectedTag}
          handleOnSelect={handleTagSelect}
        />
        {filteredBlogs?.length ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 py-16 container"
            ref={elemToScrollToOnSearch}
          >
            {filteredBlogs.map((blog, index) => {
              return (
                <div key={blog.sys.id} className="fadeInUp">
                  <Card
                    cardImageSrc={
                      "https:" + blog.fields?.thumbnail.fields.file.url
                    }
                    articleLink={"/articles/" + blog.sys.id}
                    title={blog.fields?.title}
                    desc={blog.fields?.description}
                    authorName={blog.fields?.authorName}
                    authorImage={
                      "https:" + blog.fields?.authorImage?.fields.file.url
                    }
                    editDate={blog.fields?.editDate}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div ref={elemToScrollToOnSearch}>
            <BlogNotFound />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  try {
    const res = await client.getEntries<Blog>({
      content_type: "coinmenaBlog",
      locale,
    });

    return {
      props: {
        locale,
        messages: (await import(`../lang/${locale}.json`)).default,
        blogs: res.items,
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default Home;
