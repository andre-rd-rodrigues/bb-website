import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import Logo from "./Logo";
import { dm_sans, encode, ivy_presto } from "@/styles/fonts";
import { useRouter } from "next/router";
import LanguageSelector from "./LanguageSelector";
import { useGSAP } from "@gsap/react";
import { gsap, prefersMotion } from "@/lib/gsap";
import { useTranslations } from "next-intl";
import styles from "./navbar.module.scss";
import { gaAttrs } from "@/lib/analytics";

const WHATSAPP_HREF = "https://wa.me/916690609";
const WHATSAPP_ICON = "mingcute:whatsapp-fill";

export default function Navbar() {
  const router = useRouter();
  const t = useTranslations("components.navbar");
  const tButtons = useTranslations("components.buttons");

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { getTranslationsArray } = useTranslation();

  const navlinks = getTranslationsArray("components.navbar.links");
  const pathname = router.pathname;

  const barRef = useRef(null);
  const linksRef = useRef(null);
  const mobileLinksRef = useRef(null);
  const lastScroll = useRef(0);

  useGSAP(
    () => {
      if (!prefersMotion()) return;
      const tl = gsap.timeline();
      tl.from(barRef.current, {
        yPercent: -100,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out"
      });
      if (linksRef.current) {
        tl.from(
          linksRef.current.children,
          { autoAlpha: 0, y: -10, stagger: 0.08, duration: 0.5 },
          "-=0.3"
        );
      }
    },
    { scope: barRef }
  );

  useGSAP(
    () => {
      if (!prefersMotion() || !navbarOpen || !mobileLinksRef.current) return;

      gsap.fromTo(
        mobileLinksRef.current.children,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.45,
          ease: "power3.out"
        }
      );
    },
    { dependencies: [navbarOpen], scope: mobileLinksRef }
  );

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (!prefersMotion() || !barRef.current) {
        lastScroll.current = y;
        return;
      }

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop || navbarOpen) {
        gsap.to(barRef.current, { yPercent: 0, duration: 0.3 });
        lastScroll.current = y;
        return;
      }

      const scrollingDown = y > lastScroll.current;
      gsap.to(barRef.current, {
        yPercent: scrollingDown && y > 140 ? -100 : 0,
        duration: 0.4,
        ease: "power2.out"
      });
      lastScroll.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarOpen]);

  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navbarOpen]);

  useEffect(() => {
    setNavbarOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => setNavbarOpen(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed z-50 w-full">
      <div
        ref={barRef}
        className={`${styles.bar} backdrop-blur-lg ${
          navbarOpen
            ? styles.barMenuOpen
            : scrolled
              ? styles.barScrolled
              : styles.barRest
        }`}
      >
        <nav
          className={`relative mx-auto flex max-w-[var(--page-max-width)] items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-10 lg:py-4 ${dm_sans.className}`}
          aria-label="Main"
        >
          <Link href="/" className={styles.brand}>
            <Logo fill="#1E2E45" width={44} height={44} aria-hidden="true" />
            <span className={styles.brandText}>
              <span className={`${styles.brandName} ${ivy_presto.className}`}>
                {t("brandName")}
              </span>
              <span className={`${styles.brandTagline} ${encode.className}`}>
                {t("brandTagline")}
              </span>
            </span>
          </Link>

          <ul
            ref={linksRef}
            className="hidden list-none items-center lg:flex lg:flex-1 lg:justify-center"
          >
            {navlinks.map(({ href, name }) => (
              <li key={name}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${
                    isActive(href) ? styles.navLinkActive : ""
                  }`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <LanguageSelector compact />
            <span className={styles.actionsDivider} aria-hidden="true" />
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.cta} inline-flex items-center justify-center gap-2 ${dm_sans.className}`}
              {...gaAttrs("contact_click", {
                method: "whatsapp",
                location: "navbar"
              })}
            >
              <Icon
                icon={WHATSAPP_ICON}
                fontSize={16}
                aria-hidden="true"
              />
              {tButtons("contact")}
            </a>
          </div>

          <button
            type="button"
            className={`${styles.menuToggle} ${
              navbarOpen ? styles.menuToggleOpen : ""
            }`}
            aria-expanded={navbarOpen}
            aria-controls="mobile-navigation"
            aria-label={navbarOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setNavbarOpen((prevState) => !prevState)}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </span>
          </button>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        className={`${styles.mobileOverlay} backdrop-blur-lg ${
          navbarOpen ? styles.mobileOverlayOpen : ""
        }`}
        aria-hidden={!navbarOpen}
      >
        <ul ref={mobileLinksRef} className={styles.mobileLinks}>
          {navlinks.map(({ href, name }) => (
            <li key={name}>
              <Link
                href={href}
                className={`${styles.mobileLink} ${ivy_presto.className} ${
                  isActive(href) ? styles.mobileLinkActive : ""
                }`}
                onClick={closeMobileMenu}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.mobileFooter}>
          <div className={styles.mobileActionGroup}>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.mobileCta} inline-flex items-center justify-center gap-2 ${dm_sans.className}`}
              {...gaAttrs("contact_click", {
                method: "whatsapp",
                location: "navbar_mobile"
              })}
              onClick={closeMobileMenu}
            >
              <Icon
                icon={WHATSAPP_ICON}
                fontSize={18}
                aria-hidden="true"
              />
              {tButtons("contact")}
            </a>
            <LanguageSelector compact light className={styles.mobileLanguage} />
          </div>
        </div>
      </div>
    </header>
  );
}
