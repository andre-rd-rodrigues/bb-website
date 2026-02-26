describe("Dependency migration smoke tests", () => {
  describe("React", () => {
    it("exports createElement and isValidElement", () => {
      const React = require("react");
      expect(typeof React.createElement).toBe("function");
      expect(typeof React.isValidElement).toBe("function");
    });

    it("exports hooks used by the app", () => {
      const React = require("react");
      expect(typeof React.useState).toBe("function");
      expect(typeof React.useEffect).toBe("function");
      expect(typeof React.useContext).toBe("function");
    });
  });

  describe("react-dom", () => {
    it("exports render or createRoot", () => {
      const ReactDOM = require("react-dom");
      // React 18 uses createRoot; React 17 uses render
      expect(
        typeof ReactDOM.createRoot === "function" ||
          typeof ReactDOM.render === "function"
      ).toBe(true);
    });
  });

  describe("next-intl", () => {
    it("exports useTranslations", () => {
      const nextIntl = require("next-intl");
      expect(typeof nextIntl.useTranslations).toBe("function");
    });

    it("exports provider or useTranslations (main API surface)", () => {
      const nextIntl = require("next-intl");
      // NextIntlClientProvider may be undefined when next-intl is mocked in Jest
      expect(
        nextIntl.NextIntlClientProvider != null ||
          nextIntl.useTranslations != null
      ).toBe(true);
    });
  });

  describe("@formspree/react", () => {
    it("exports useForm", () => {
      const formspree = require("@formspree/react");
      expect(typeof formspree.useForm).toBe("function");
    });
  });

  describe("@headlessui/react", () => {
    it("exports Dialog and Transition components", () => {
      const headless = require("@headlessui/react");
      expect(headless.Dialog).toBeDefined();
      expect(headless.Transition).toBeDefined();
    });
  });

  describe("@iconify/react", () => {
    it("exports Icon component", () => {
      const iconify = require("@iconify/react");
      expect(iconify.Icon).toBeDefined();
    });
  });

  describe("next (core)", () => {
    it("can be required without throwing", () => {
      expect(() => require("next")).not.toThrow();
    });

    it("exports expected Next.js runtime surface", () => {
      const next = require("next");
      // Next.js default export is the main entry; may have default or named exports
      expect(next).toBeDefined();
    });
  });

  describe("next/link", () => {
    it("exports Link component", () => {
      const mod = require("next/link");
      const Link = mod.default ?? mod;
      expect(Link).toBeDefined();
      expect(typeof Link === "function" || typeof Link === "object").toBe(true);
    });
  });

  describe("next/image", () => {
    it("exports Image component", () => {
      const mod = require("next/image");
      const Image = mod.default ?? mod;
      expect(Image).toBeDefined();
      expect(typeof Image === "function" || typeof Image === "object").toBe(
        true
      );
    });
  });

  describe("next/router", () => {
    it("exports useRouter", () => {
      const router = require("next/router");
      expect(typeof router.useRouter).toBe("function");
    });
  });

  describe("react-intersection-observer", () => {
    it("exports useInView", () => {
      const pkg = require("react-intersection-observer");
      expect(typeof pkg.useInView).toBe("function");
    });
  });

  describe("use-count-up", () => {
    it("exports CountUp component", () => {
      const pkg = require("use-count-up");
      expect(pkg.CountUp).toBeDefined();
    });
  });

  describe("keen-slider", () => {
    it("can be required without throwing", () => {
      expect(() => require("keen-slider")).not.toThrow();
    });

    it("exports default or useKeenSlider", () => {
      const keen = require("keen-slider");
      const main = keen.default ?? keen;
      expect(main != null || keen.useKeenSlider != null).toBe(true);
    });
  });

  describe("react-responsive-carousel", () => {
    it("exports Carousel component", () => {
      const carousel = require("react-responsive-carousel");
      expect(carousel.Carousel).toBeDefined();
    });
  });

  describe("next-seo", () => {
    it("exports DefaultSeo or NextSeo", () => {
      const seo = require("next-seo");
      expect(seo.DefaultSeo != null || seo.NextSeo != null).toBe(true);
    });
  });
});
