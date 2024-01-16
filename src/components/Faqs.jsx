import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import useTranslation from "@/hooks/useTranslation";
import { Icon } from "@iconify/react";

const Faqs = () => {
  const t = useTranslations("components");
  const { getTranslationsArray } = useTranslation();
  const faqsData = getTranslationsArray("components.faqs.questions");

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="flex">
      {/* Image on the left */}
      <div className="relative h-96 flex-shrink-0 w-1/2 flex items-center justify-end">
        <div className="absolute top-0 left-0 h-52 w-96">
          <Image
            src="https://images.unsplash.com/photo-1676181739859-08330dea8999?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            layout="fill"
            objectFit="cover"
            alt="Background Image"
            className="absolute z-0"
          />
        </div>
        <h2 className="relative max-w-80 text-4xl text-white">
          {t("faqs.title")}
        </h2>
      </div>

      {/* FAQs section on the right */}
      <div className="flex-grow p-8">
        {/* FAQs List */}
        <ul>
          {faqsData.map((faq, index) => (
            <li key={index} className="text-white">
              <button
                onClick={() => handleToggle(index)}
                className="flex items-center justify-between w-full p-4"
              >
                <h6 className="text-lg ">{faq.question}</h6>
                <span>
                  {openIndex === index ? (
                    <Icon
                      icon="iconamoon:arrow-down-2-thin"
                      fontSize={30}
                      rotate="-90"
                    />
                  ) : (
                    <Icon icon="iconamoon:arrow-down-2-thin" fontSize={30} />
                  )}
                </span>
              </button>

              {/* Collapsible content */}
              {openIndex === index && (
                <div className="px-4 pb-7">
                  <p>{faq.answer}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Faqs;
