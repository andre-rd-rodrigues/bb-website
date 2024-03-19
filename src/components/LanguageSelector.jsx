import useIsMobile from "@/hooks/useIsMobile";
import { dm_sans } from "@/styles/fonts";
import { Popover, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

function LanguageSelector() {
  const t = useTranslations();
  const { route } = useRouter();
  const locale = useLocale();

  const isMobile = useIsMobile();

  const checkMark = (lang) => (
    <span className="ml-4">{locale === lang && `✔`}</span>
  );

  return (
    <Popover className="relative mx-5 my-1 flex justify-end">
      {/* Icon Button */}
      <Popover.Button className="h-full flex items-center justify-center focus:outline-none">
        <Icon icon="ph:globe-thin" fontSize={33} className="text-blue" />
      </Popover.Button>

      {/* Dropdown */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className={`absolute ${
            isMobile ? "left-0" : "right-0"
          } z-10 mt-2 overflow-hidden bg-white shadow-lg text-dark`}
        >
          <Popover.Button
            as={Link}
            href={route}
            locale={"en"}
            className={`group relative flex items-center px-9 py-4 text-m  hover:bg-gray-50 ${dm_sans.className}`}
          >
            English {checkMark("en")}
          </Popover.Button>
          <Popover.Button
            as={Link}
            href={route}
            locale={"pt"}
            className={`group relative flex items-center px-9 py-4 text-m  hover:bg-gray-50 ${dm_sans.className}`}
          >
            Português {checkMark("pt")}
          </Popover.Button>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default LanguageSelector;
