import { screen, render } from '@testing-library/react';
import React from 'react';

/**
 * Helper function to find a specific link when there are multiple links with the same text
 * @param linkText - The text content of the link
 * @param parentSelector - CSS selector to find the parent container
 * @returns The found link element
 */
export const findLinkInContainer = (
  linkText: string,
  parentSelector: string,
) => {
  const links = screen.getAllByRole('link', { name: linkText });
  return links.find((link) => link.closest(parentSelector));
};

/**
 * Helper function to find navigation links specifically
 * @param linkText - The text content of the link
 * @returns The navigation link element
 */
export const findNavLink = (linkText: string) => {
  return findLinkInContainer(linkText, 'div');
};

/**
 * Helper function to find footer bottom links specifically
 * @param linkText - The text content of the link
 * @returns The footer bottom link element
 */
export const findFooterBottomLink = (linkText: string) => {
  const links = screen.getAllByRole('link', { name: linkText });
  return links.find((link) => link.className.includes('text-xs font-light'));
};

/**
 * Helper function to check if external links open in new tabs
 * @param linkTexts - Array of link text contents to check
 */
export const expectExternalLinksToOpenInNewTab = (
  linkTexts: (string | RegExp)[],
) => {
  linkTexts.forEach((linkText) => {
    const link = screen.getByRole('link', { name: linkText });
    expect(link).toHaveAttribute('target', '_blank');
  });
};

/**
 * Helper function to check CSS classes on an element
 * @param element - The element to check
 * @param expectedClasses - Array of expected CSS classes
 */
export const expectElementToHaveClasses = (
  element: HTMLElement,
  expectedClasses: string[],
) => {
  expectedClasses.forEach((className) => {
    expect(element).toHaveClass(className);
  });
};

/**
 * Helper function to render components for testing
 * @param component - The React component to render
 * @param options - Optional render options
 */
export const renderWithMotion = (
  component: React.ReactElement,
  options?: Parameters<typeof render>[1],
) => {
  return render(component, options);
};