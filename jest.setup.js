import "@testing-library/jest-dom";
import { setupCommonMocks } from "./__tests__/__mocks__/common";

// Setup all common mocks
setupCommonMocks();

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
