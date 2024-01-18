import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { dm_sans } from "@/styles/fonts";
import { useRouter } from "next/router";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const router = useRouter();

  const [navbarOpen, setNavbarOpen] = useState(false);

  const { getTranslationsArray } = useTranslation();

  const navlinks = getTranslationsArray("components.navbar.links");
  const pathname = router.pathname;

  return (
    <header className="fixed z-50 w-full backdrop-blur-md bg-white/40">
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3  mb-3">
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
                className="h-6 w-6"
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
            className={
              "lg:flex w-full lg:w-auto justify-end" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {navlinks.map(({ href, name }) => (
                <Link
                  className="px-5 py-1 flex items-center justify-end lg:justify-center text-md text-left text-blue hover:opacity-75"
                  href={href}
                  key={name}
                  onClick={() => setNavbarOpen((prevState) => !prevState)}
                >
                  <li
                    className={`${
                      pathname === href ? "border-b-2 border-blue" : ""
                    } ${dm_sans.className}`}
                  >
                    {name}
                  </li>
                </Link>
              ))}
              <LanguageSelector />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
