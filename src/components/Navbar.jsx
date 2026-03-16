import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { dm_sans } from "@/styles/fonts";
import { useRouter } from "next/router";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const router = useRouter();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { getTranslationsArray } = useTranslation();

  const navlinks = getTranslationsArray("components.navbar.links");
  const pathname = router.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        scrolled
          ? "backdrop-blur-md bg-white/80 shadow-sm"
          : "backdrop-blur-sm bg-white/30"
      }`}
    >
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" href="/">
              <Logo fill="#1E2E45" width={40} height={40} />
            </Link>
            <button
              className="text-blue cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen((prevState) => !prevState)}
            >
              <svg
                className="h-6 w-6 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          <div
            className={`w-full lg:w-auto justify-end grid lg:flex transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              navbarOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden lg:overflow-visible">
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                {navlinks.map(({ href, name }) => (
                  <Link
                    className="px-5 py-1 flex items-center justify-end lg:justify-center text-md text-left text-blue transition-opacity duration-200"
                    href={href}
                    key={name}
                    onClick={() => setNavbarOpen(false)}
                  >
                    <li
                      className={`${
                        pathname === href
                          ? "border-b-2 border-blue"
                          : "border-b-2 border-transparent hover:border-gold/50"
                      } ${dm_sans.className} transition-colors duration-300`}
                    >
                      {name}
                    </li>
                  </Link>
                ))}
                <LanguageSelector />
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
