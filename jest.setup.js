import "@testing-library/jest-dom";
import { setupCommonMocks } from "./__tests__/__mocks__/common";

// Setup all common mocks
setupCommonMocks();

// Make GSAP inert in jsdom: useGSAP is a no-op and the plugin/helper surface
// returns safe stubs so components render their children without animating.
jest.mock("@gsap/react", () => ({
  useGSAP: () => {}
}));

jest.mock("@/lib/gsap", () => {
  const noop = () => {};
  const timeline = { from: () => timeline, to: () => timeline, set: () => timeline };
  return {
    gsap: {
      from: noop,
      to: noop,
      set: noop,
      fromTo: noop,
      timeline: () => timeline,
      defaults: noop,
      registerPlugin: noop
    },
    ScrollTrigger: { create: noop, refresh: noop, batch: noop, getAll: () => [] },
    ScrollSmoother: {
      create: () => ({ kill: noop, scrollTo: noop }),
      get: () => null
    },
    SplitText: {
      create: () => ({ words: [], lines: [], chars: [], revert: noop })
    },
    Flip: { getState: () => ({}), from: noop },
    prefersMotion: () => false
  };
});

// Suppress React warning from react-responsive-carousel forwarding showThumbs to a DOM element
const originalError = console.error;
console.error = (...args) => {
  const msg = args.map((a) => (typeof a === "string" ? a : String(a))).join(" ");
  if (msg.includes("showThumbs") && msg.includes("React does not recognize")) {
    return;
  }
  originalError.apply(console, args);
};

// Mock CSS custom properties for testing
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: (prop) => {
      const properties = {
        "--color-secondary": "#1a1a1a",
        "--color-primary": "#000000",
        "--color-accent": "#3b82f6",
        "--color-danger": "#ef4444",
        "--color-border-primary": "#e5e7eb"
      };
      return properties[prop] || "";
    }
  })
});

// Mock IntersectionObserver for react-intersection-observer
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = Object.freeze([]);

  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
};
