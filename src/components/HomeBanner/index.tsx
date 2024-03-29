import React, { BaseSyntheticEvent, RefObject } from "react";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { LOCALE } from "../../constants";

interface HomeBannerProps {
  searchValue: string;
  handleOnChange: (value: string) => void;
  elemToScrollTo: RefObject<HTMLElement>;
}

const HomeBanner: NextPage<HomeBannerProps> = ({
  searchValue,
  handleOnChange,
  elemToScrollTo,
}) => {
  const { locale } = useRouter();
  const t = useTranslations("Home");
  const handleOnClick = () => {
    elemToScrollTo.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  return (
    <div className="py-24 bg-[#081f39]">
      <div className="container">
        <div className="text-4xl md:text-5xl lg:text-6xl mb-6 font-bold text-center text-white">
          {t("title")}
        </div>
        <div className="mb-9 text-center max-w-lg mx-auto text-white">
          {t("description")}
        </div>
        <form
          className="max-w-lg mx-auto relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="w-full h-16 rounded-full placeholder:text-slate-400 px-8"
            type="search"
            name="search"
            id="search"
            placeholder={t("searchPlaceholderText")}
            value={searchValue}
            onChange={(e: BaseSyntheticEvent) => handleOnChange(e.target.value)}
          />
          <button
            className={`rounded-full absolute top-1 ${locale === LOCALE.AR ? "left-1" : "right-1"}`}
            style={{
              background:
                "linear-gradient(rgb(255, 130, 22) 0%, rgb(220, 102, 0) 100%)",
              height: 56,
              width: 56,
            }}
            type="submit"
            onClick={handleOnClick}
          >
            <svg
              className="mx-auto"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.6719 20.7656L18.9844 16.0781C18.75 15.8906 18.4688 15.75 18.1875 15.75H17.4375C18.7031 14.1094 19.5 12.0469 19.5 9.75C19.5 4.40625 15.0938 0 9.75 0C4.35938 0 0 4.40625 0 9.75C0 15.1406 4.35938 19.5 9.75 19.5C12 19.5 14.0625 18.75 15.75 17.4375V18.2344C15.75 18.5156 15.8438 18.7969 16.0781 19.0312L20.7188 23.6719C21.1875 24.1406 21.8906 24.1406 22.3125 23.6719L23.625 22.3594C24.0938 21.9375 24.0938 21.2344 23.6719 20.7656ZM9.75 15.75C6.42188 15.75 3.75 13.0781 3.75 9.75C3.75 6.46875 6.42188 3.75 9.75 3.75C13.0312 3.75 15.75 6.46875 15.75 9.75C15.75 13.0781 13.0312 15.75 9.75 15.75Z"
                fill="white"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeBanner;
