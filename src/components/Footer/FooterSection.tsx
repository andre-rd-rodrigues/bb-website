import { dm_serif } from "@/styles/fonts";
import { Icon } from "@iconify/react";
import Link from "next/link";

export interface FooterSubLink {
  name: string;
  href: string;
  icon?: string;
}

interface FooterSectionProps {
  title: string;
  sectionHref: string;
  subLinks?: FooterSubLink[] | null;
}

const FooterSection = ({ title, sectionHref, subLinks }: FooterSectionProps) => {
  const isContact = title.toLowerCase().includes("contact");

  return (
    <div>
      <h2
        className={`text-m font-medium mb-2 tracking-wider text-white ${dm_serif.className}`}
      >
        {title}
      </h2>
      <ul className="text-white opacity-95 font-thin">
        {subLinks?.map(({ name, href, icon }, i) =>
          isContact ? (
            <li key={i}>
              <Link
                href={href}
                className="hover:underline flex gap-1 items-center mb-2 mt-1"
              >
                {icon && <Icon icon={icon} fontSize={15} />}
                <p className="text-xs">{name}</p>
              </Link>
            </li>
          ) : (
            <li key={i}>
              <Link href={href} className="hover:underline text-xs">
                {name}
              </Link>
            </li>
          )
        )}

        {/* When no sub links are provided */}
        {!subLinks && !isContact && (
          <li>
            <Link href={sectionHref} className="hover:underline text-xs">
              {title}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FooterSection;
