import { NextPage } from "next";
import { useRouter } from "next/router";

interface FooterProps {}

const Footer: NextPage<FooterProps> = () => {
  const { locale } = useRouter();
  return (
    <footer className="bg-[#081f39]">
      <div className="flex container justify-between items-center h-16  text-white text-xs">
        <div>© 2019-2022 COINMENA B.S.C.</div>
        <div className="flex items-center">
          <a href={"https://support.coinmena.com/hc/" + locale?.toLowerCase()}>
            <div className="hover:text-[#FF8216]">Support</div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
