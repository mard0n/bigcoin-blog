import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { LOCALE } from "../../../constants";
import style from "./BurgerMenu.module.css";

interface BurgerMenuProps {}

const BurgerMenu: FunctionComponent<BurgerMenuProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Home");
  const { locale, route } = useRouter();
  return (
    <>
      <div
        className="text-white cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 z-40 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 z-40 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </div>
      <div
        className={`${style["mobile-menu-container"]} ${
          locale === LOCALE.AR
            ? style["mobile-menu-left"]
            : style["mobile-menu-right"]
        }`}
        style={
          isMenuOpen
            ? locale === LOCALE.AR
              ? { transform: "translateX(100%)" }
              : { transform: "translateX(-100%)" }
            : undefined
        }
      >
        {children}
      </div>
    </>
  );
};

export default BurgerMenu;
