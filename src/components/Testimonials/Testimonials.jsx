import useTranslation from "@/hooks/useTranslation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Testimonial from "./Testimonial";
import useIsMobile from "@/hooks/useIsMobile";
import Animated from "../Animated";

function Testimonials() {
  const t = useTranslations("components");
  const { getTranslationsArray } = useTranslation();
  const isMobile = useIsMobile();

  const testimonials = getTranslationsArray("components.testimonials.feedback");

  return (
    <>
      <div className="relative flex mb-20">
        <div className="relative z-10 mt-5">
          <Animated type="slide-in-left">
            <h3 className="text-blue">{t("testimonials.subtitle")}</h3>
          </Animated>
          <Animated type="slide-in-left" delay={100}>
            <h4 className="text-4xl text-blue mt-3">
              {t("testimonials.title")}
            </h4>
          </Animated>
        </div>
        <div className="absolute h-36 w-8/12 right-0">
          <Image
            src="/img/columns.jpg"
            layout="fill"
            objectFit="cover"
            className=""
            alt="Testimonials"
          />
        </div>
      </div>
      <Carousel showStatus={false} emulateTouch={isMobile}>
        {testimonials.map(({ author, feedback, imageUrl }) => (
          <Testimonial
            author={author}
            feedback={feedback}
            imageUrl={imageUrl}
            key={author}
          />
        ))}
      </Carousel>
    </>
  );
}

export default Testimonials;

export async function getStaticProps({ locale }) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}
