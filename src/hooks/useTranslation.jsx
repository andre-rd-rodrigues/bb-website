const { useRouter } = require("next/router");
import { useTranslations } from "next-intl";
import enTranslations from "../messages/en.json";
import ptTranslations from "../messages/pt.json";

const useTranslation = () => {
  const { locale } = useRouter();

  const translations = locale === "en" ? enTranslations : ptTranslations;

  const getTranslationsArray = (key) => {
    // Split the key string into an array of keys
    const keys = key.split(".");

    // Use reduce to traverse the nested object
    const result = keys.reduce((obj, currentKey) => {
      return obj && obj[currentKey] !== "undefined"
        ? obj[currentKey]
        : undefined;
    }, translations);

    // Check if the result is an array
    if (Array.isArray(result)) {
      return result;
    }

    // Log an error or handle the case where the result is not an array
    console.error(`Value for key "${key}" is not an array.`);
    return [];
  };

  return {
    translations,
    getTranslationsArray
  };
};

export default useTranslation;
