import useIsMobile from "@/hooks/useIsMobile";
import { dm_sans } from "@/styles/fonts";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";

function LanguageSelector({ compact = false, light = false, className = "" }) {
  const { route } = useRouter();
  const locale = useLocale();

  const isMobile = useIsMobile();

  const checkMark = (lang) => (
    <span className="ml-3 text-gold">{locale === lang && "✔"}</span>
  );

  const iconClass = light
    ? "text-white transition-colors duration-300 hover:text-gold"
    : "text-blue transition-colors duration-300 hover:text-gold";

  return (
    <Popover className={`relative flex ${compact ? "" : "mx-5 my-1 justify-end"} ${className}`}>
      <PopoverButton
        className={`flex h-full items-center justify-center rounded-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
          light ? "focus-visible:ring-offset-blue" : "focus-visible:ring-offset-[var(--background)]"
        }`}
        aria-label={locale === "pt" ? "Language: Portuguese" : "Language: English"}
      >
        <Icon
          icon="ph:globe-thin"
          fontSize={light ? 30 : compact ? 22 : 33}
          className={iconClass}
        />
      </PopoverButton>

      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          className={`absolute ${
            isMobile ? "left-0" : "right-0"
          } z-10 mt-2 overflow-hidden border border-gold/15 bg-[color-mix(in_srgb,var(--background)_96%,white)] text-dark shadow-[0_12px_40px_rgb(30_46_69_/_0.12)]`}
        >
          <PopoverButton
            as={Link}
            href={route}
            locale={"en"}
            className={`group relative flex items-center px-8 py-3.5 text-sm tracking-wide transition-colors duration-300 hover:bg-gold/8 ${dm_sans.className}`}
          >
            English {checkMark("en")}
          </PopoverButton>
          <PopoverButton
            as={Link}
            href={route}
            locale={"pt"}
            className={`group relative flex items-center px-8 py-3.5 text-sm tracking-wide transition-colors duration-300 hover:bg-gold/8 ${dm_sans.className}`}
          >
            Português {checkMark("pt")}
          </PopoverButton>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

export default LanguageSelector;
