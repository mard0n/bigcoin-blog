import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import BurgerMenu from "./BurgerMenu";
import Logo from "./Logo";

const GlobeIcon = () => (
  <svg
    className="inline-block"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <circle cx="8" cy="8" r="7.4" stroke="#FF8215" strokeWidth="1.2"></circle>
    <path
      d="M11.5716 8C11.5716 10.1326 11.1195 12.0335 10.4177 13.3794C9.70069 14.7544 8.81536 15.4 7.99985 15.4C7.18434 15.4 6.29901 14.7544 5.58201 13.3794C4.88017 12.0335 4.42813 10.1326 4.42813 8C4.42813 5.8674 4.88017 3.96646 5.58201 2.62057C6.29901 1.24558 7.18434 0.6 7.99985 0.6C8.81536 0.6 9.70069 1.24558 10.4177 2.62057C11.1195 3.96646 11.5716 5.8674 11.5716 8Z"
      stroke="#FF8215"
      strokeWidth="1.2"
    ></path>
    <path d="M0.5 8L15.5 8" stroke="#FF8215" strokeWidth="1.2"></path>
  </svg>
);

interface HeaderProps {}

const Header: NextPage<HeaderProps> = () => {
  const { locale, route } = useRouter();
  const t = useTranslations("Home");

  return (
    <div className="bg-[#081f39]">
      <div className="container flex justify-between items-center h-[84px]">
        <Logo />
        <div className="block md:hidden">
          <BurgerMenu>
            <div className="hover:text-[#FF8216] mx-8 mt-20 mb-2">
              <a
                href={
                  "https://support.coinmena.com/hc/" + locale?.toLowerCase()
                }
                target="_blank"
                rel="noreferrer"
              >
                {t("menuSupport")}
              </a>
            </div>
            <div className="hover:text-[#FF8216] mx-8 mb-2">
              <a
                href="https://app.coinmena.com/signin"
                target="_blank"
                rel="noreferrer"
              >
                {t("menuSignIn")}
              </a>
            </div>
            <div className="hover:text-[#FF8216] mx-8 mb-2">
              <a
                href="https://app.coinmena.com/signup"
                target="_blank"
                rel="noreferrer"
              >
                {t("menuSignUp")}
              </a>
            </div>
            <div className="hover:text-[#FF8216] mx-8 mb-2">
              <GlobeIcon />{" "}
              {locale === "ar" ? (
                <Link href={route} locale="en-US">
                  English
                </Link>
              ) : (
                <Link href={route} locale="ar">
                  عربى
                </Link>
              )}
            </div>
          </BurgerMenu>
        </div>
        <div className="hidden md:block">
          <div className="flex text-white text-sm items-center">
            <div className="hover:text-[#FF8216] ml-8">
              <a
                href={
                  "https://support.coinmena.com/hc/" + locale?.toLowerCase()
                }
                target="_blank"
                rel="noreferrer"
              >
                {t("menuSupport")}
              </a>
            </div>
            <div className="w-[2px] h-[16px] bg-[#FF8216] ml-8" />
            <div className="hover:text-[#FF8216] ml-8">
              <a
                href="https://app.coinmena.com/signin"
                target="_blank"
                rel="noreferrer"
              >
                {t("menuSignIn")}
              </a>
            </div>
            <div className="hover:text-[#FF8216] ml-8">
              <a
                href="https://app.coinmena.com/signup"
                target="_blank"
                rel="noreferrer"
              >
                {t("menuSignUp")}
              </a>
            </div>
            <div className="hover:text-[#FF8216] ml-8">
              <GlobeIcon />{" "}
              {locale === "ar" ? (
                <Link href={route} locale="en-US">
                  English
                </Link>
              ) : (
                <Link href={route} locale="ar">
                  عربى
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
