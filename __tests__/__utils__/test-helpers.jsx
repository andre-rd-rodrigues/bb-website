import { screen, render } from "@testing-library/react";
import React from "react";

/**
 * Helper function to find a specific link when there are multiple links with the same text
 * @param {string} linkText - The text content of the link
 * @param {string} parentSelector - CSS selector to find the parent container
 * @returns {HTMLElement} The found link element
 */
export const findLinkInContainer = (linkText, parentSelector) => {
  const links = screen.getAllByRole("link", { name: linkText });
  return links.find((link) => link.closest(parentSelector));
};

/**
 * Helper function to find navigation links specifically
 * @param {string} linkText - The text content of the link
 * @returns {HTMLElement} The navigation link element
 */
export const findNavLink = (linkText) => {
  return findLinkInContainer(linkText, "div");
};

/**
 * Helper function to find footer bottom links specifically
 * @param {string} linkText - The text content of the link
 * @returns {HTMLElement} The footer bottom link element
 */
export const findFooterBottomLink = (linkText) => {
  const links = screen.getAllByRole("link", { name: linkText });
  return links.find((link) => link.className.includes("text-xs font-light"));
};

/**
 * Helper function to check if external links open in new tabs
 * @param {(string | RegExp)[]} linkTexts - Array of link text contents to check
 */
export const expectExternalLinksToOpenInNewTab = (linkTexts) => {
  linkTexts.forEach((linkText) => {
    const link = screen.getByRole("link", { name: linkText });
    expect(link).toHaveAttribute("target", "_blank");
  });
};

/**
 * Helper function to check CSS classes on an element
 * @param {HTMLElement} element - The element to check
 * @param {string[]} expectedClasses - Array of expected CSS classes
 */
export const expectElementToHaveClasses = (element, expectedClasses) => {
  expectedClasses.forEach((className) => {
    expect(element).toHaveClass(className);
  });
};

/**
 * Helper function to render components for testing
 * @param {React.ReactElement} component - The React component to render
 * @param {Object} options - Optional render options
 */
export const renderWithMotion = (component, options) => {
  return render(component, options);
};
