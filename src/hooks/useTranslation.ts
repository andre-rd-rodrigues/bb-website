import { useRouter } from "next/router";
import enTranslations from "@/messages/en.json";
import ptTranslations from "@/messages/pt.json";

type Translations = typeof enTranslations;

export default function useTranslation(): {
  translations: Translations;
  getTranslationsArray: (key: string) => unknown[];
} {
  const { locale } = useRouter();

  const translations: Translations =
    locale === "en" ? enTranslations : ptTranslations;

  const getTranslationsArray = (key: string): unknown[] => {
    const keys = key.split(".");
    const result = keys.reduce<unknown>(
      (obj, currentKey) =>
        obj !== undefined && obj !== null && typeof obj === "object" && currentKey in obj
          ? (obj as Record<string, unknown>)[currentKey]
          : undefined,
      translations as unknown
    );

    if (Array.isArray(result)) {
      return result;
    }

    console.error(`Value for key "${key}" is not an array.`);
    return [];
  };

  return {
    translations,
    getTranslationsArray,
  };
}
