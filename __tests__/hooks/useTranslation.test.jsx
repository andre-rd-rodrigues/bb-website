import { renderHook } from "@testing-library/react";

// Use the real hook implementation for these tests
jest.unmock("@/hooks/useTranslation");

const mockUseRouter = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => mockUseRouter()
}));

import useTranslation from "@/hooks/useTranslation";

describe("useTranslation", () => {
  const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("returns English translations when locale is en", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useTranslation());

    expect(result.current.translations).toBeDefined();
    expect(result.current.translations.pages?.homepage?.title).toBe("Bárbara Barbizani");
    expect(result.current.translations.pages?.about?.title).toBe("About");
  });

  it("returns Portuguese translations when locale is pt", () => {
    mockUseRouter.mockReturnValue({ locale: "pt" });
    const { result } = renderHook(() => useTranslation());

    expect(result.current.translations).toBeDefined();
    expect(result.current.translations.pages?.homepage?.title).toBeDefined();
    expect(result.current.translations.pages?.about?.title).toBeDefined();
  });

  it("exposes getTranslationsArray function", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useTranslation());

    expect(typeof result.current.getTranslationsArray).toBe("function");
  });

  it("getTranslationsArray returns array for valid nested key that points to an array", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useTranslation());

    const arr = result.current.getTranslationsArray("pages.homepage.about.extraInfo");
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBeGreaterThan(0);
    expect(arr[0]).toHaveProperty("title");
    expect(arr[0]).toHaveProperty("value");
  });

  it("getTranslationsArray returns contacts links array for pages.contacts.links", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useTranslation());

    const arr = result.current.getTranslationsArray("pages.contacts.links");
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toBeGreaterThan(0);
    expect(arr[0]).toHaveProperty("description");
    expect(arr[0]).toHaveProperty("href");
    expect(arr[0]).toHaveProperty("icon");
  });

  it("getTranslationsArray returns empty array and logs error when value is not an array", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useTranslation());

    const arr = result.current.getTranslationsArray("pages.homepage.title");
    expect(arr).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Value for key "pages.homepage.title" is not an array.'
    );
  });

  it("getTranslationsArray returns empty array for non-existent key", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useTranslation());

    const arr = result.current.getTranslationsArray("pages.nonexistent.key");
    expect(arr).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Value for key "pages.nonexistent.key" is not an array.'
    );
  });

  it("getTranslationsArray returns empty array for deeply nested non-array value", () => {
    mockUseRouter.mockReturnValue({ locale: "en" });
    const { result } = renderHook(() => useTranslation());

    const arr = result.current.getTranslationsArray("pages.about.hero.title");
    expect(arr).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Value for key "pages.about.hero.title" is not an array.'
    );
  });
});
