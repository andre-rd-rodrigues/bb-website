import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PracticeAreas from '@/pages/practice-areas';
import { renderWithMotion } from '../__utils__/test-helpers';
import { setupCommonMocks } from '../__mocks__/common';

// Setup common mocks
setupCommonMocks();

// Mock the translation hooks with practice-areas-specific data
jest.mock('@/hooks/useTranslation', () => ({
  __esModule: true,
  default: () => ({
    getTranslationsArray: (key) => {
      if (key === 'components.practiceAreas') {
        return [
          {
            slug: 'private-international-law',
            title: 'Private International Law',
            description: 'Specialization in emigration processes, Golden Visas in Portugal.',
            imageUrl: 'https://images.unsplash.com/photo-1614107151491-6876eecbff89',
            type: 'Citizens',
            showPreview: true
          },
          {
            slug: 'real-estate-law',
            title: 'Real Estate Law',
            description: 'Specialization in real estate due diligence and purchase contracts.',
            imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716',
            type: 'Citizens'
          },
          {
            slug: 'family-law',
            title: 'Family Law',
            description: 'Specialization in drafting prenuptial agreements and divorce.',
            imageUrl: 'https://images.unsplash.com/photo-1620433042631-3df212941910',
            type: 'Citizens'
          },
          {
            slug: 'commercial-law',
            title: 'Commercial Law',
            description: 'Specialization in the creation and registration of companies.',
            imageUrl: 'https://images.unsplash.com/photo-1542908371-3d8e22825a4f',
            type: 'Company'
          },
          {
            slug: 'intellectual-property',
            title: 'Intellectual Property',
            description: 'Specialization in the protection of trademarks and patents.',
            imageUrl: 'https://images.unsplash.com/photo-1593444285553-28163240e3f1',
            type: 'Company'
          }
        ];
      }
      if (key === 'components.testimonials.feedback') {
        return [
          {
            author: 'John Doe',
            feedback: 'Excellent legal service with great attention to detail.',
            imageUrl: '/img/testimonials/john.jpg'
          }
        ];
      }
      return [];
    }
  })
}));

jest.mock('next-intl', () => ({
  useTranslations: (namespace) => (key) => {
    const translations = {
      pages: {
        'practiceAreas.title': 'Practice Areas',
        'practiceAreas.subtitle': 'How I can help',
        'practiceAreas.intro': 'Explore the areas where I guide clients.',
        'homepage.hero1.title': 'A Careful, Committed, and Dignified Approach to Law.',
        'homepage.hero1.description': 'I am here to help as your legal partner.'
      },
      'components.practiceAreasFilter': {
        all: 'All areas',
        citizens: 'Citizens',
        companies: 'Companies'
      },
      'components.practiceAreasSearch': {
        label: 'Search practice areas',
        placeholder: 'Search by topic or keyword',
        empty: 'No practice areas match your search.'
      },
      components: {
        'testimonials.subtitle': 'Testimonials',
        'testimonials.title': 'What My Clients Experienced'
      }
    };
    return translations[namespace]?.[key] || key;
  }
}));

// Mock react-responsive-carousel
jest.mock('react-responsive-carousel', () => ({
  Carousel: ({ children, showStatus, emulateTouch, ...props }) => (
    <div data-testid="carousel" {...props}>
      {children}
    </div>
  )
}));

// Mock useIsMobile hook
jest.mock('@/hooks/useIsMobile', () => ({
  __esModule: true,
  default: () => false
}));

describe('Practice Areas Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main page structure', () => {
    renderWithMotion(<PracticeAreas />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the hero title and intro block', () => {
    renderWithMotion(<PracticeAreas />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Practice Areas');
    expect(screen.getByText('How I can help')).toBeInTheDocument();
    expect(screen.getByText('Explore the areas where I guide clients.')).toBeInTheDocument();
  });

  it('renders a search bar and the audience filters', () => {
    renderWithMotion(<PracticeAreas />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All areas' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Citizens' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Companies' })).toBeInTheDocument();
  });

  it('renders every practice area as an alternating section by default', () => {
    renderWithMotion(<PracticeAreas />);
    expect(screen.getByRole('heading', { name: 'Private International Law' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Real Estate Law' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Family Law' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Commercial Law' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Intellectual Property' })).toBeInTheDocument();
  });

  it('narrows the visible sections when the Companies filter is selected', async () => {
    const user = userEvent.setup();
    renderWithMotion(<PracticeAreas />);

    await user.click(screen.getByRole('button', { name: 'Companies' }));

    expect(screen.getByRole('heading', { name: 'Commercial Law' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Private International Law' })
    ).not.toBeInTheDocument();
  });

  it('filters sections by a free-text search query', async () => {
    const user = userEvent.setup();
    renderWithMotion(<PracticeAreas />);

    await user.type(screen.getByRole('textbox'), 'trademarks');

    expect(screen.getByRole('heading', { name: 'Intellectual Property' })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Private International Law' })
    ).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches the search', async () => {
    const user = userEvent.setup();
    renderWithMotion(<PracticeAreas />);

    await user.type(screen.getByRole('textbox'), 'zzzzz');

    expect(
      screen.queryByRole('heading', { name: 'Private International Law' })
    ).not.toBeInTheDocument();
    expect(screen.getByText('No practice areas match your search.')).toBeInTheDocument();
  });

  it('renders the alternating layout with the image on the correct side', () => {
    renderWithMotion(<PracticeAreas />);

    // First item (index 0) places the image on the right (flex-row-reverse).
    const firstSection = screen
      .getByRole('heading', { name: 'Private International Law' })
      .closest('article');
    expect(firstSection).toHaveClass('lg:flex-row-reverse');

    // Second item (index 1) places the image on the left (flex-row).
    const secondSection = screen
      .getByRole('heading', { name: 'Real Estate Law' })
      .closest('article');
    expect(secondSection).toHaveClass('lg:flex-row');
  });

  it('renders navigation anchor points for citizens and companies', () => {
    renderWithMotion(<PracticeAreas />);
    expect(document.getElementById('citizens')).toBeInTheDocument();
    expect(document.getElementById('companies')).toBeInTheDocument();
  });

  it('renders the call-to-action and testimonials sections', () => {
    renderWithMotion(<PracticeAreas />);
    expect(
      screen.getByText('A Careful, Committed, and Dignified Approach to Law.')
    ).toBeInTheDocument();

    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toHaveAttribute('href', '/contacts');

    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('What My Clients Experienced')).toBeInTheDocument();
  });
});
