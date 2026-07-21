import { DM_Sans, DM_Serif_Display, Encode_Sans } from "next/font/google";
import localFont from "next/font/local";

const ivy_presto = localFont({
  src: "../fonts/ivy-presto-headline-light.otf",
  weight: "300",
  display: "swap",
  variable: "--font-heading"
});

const dm_serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif"
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-sans"
});

const encode = Encode_Sans({
  subsets: ["latin"],
  weight: ["400"]
});

export { dm_serif, dm_sans, encode, ivy_presto };
