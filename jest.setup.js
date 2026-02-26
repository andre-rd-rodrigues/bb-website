import "@testing-library/jest-dom";
import { setupCommonMocks } from "./__tests__/__mocks__/common";

// Setup all common mocks
setupCommonMocks();

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
