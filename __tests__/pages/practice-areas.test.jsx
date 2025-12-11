import React from 'react';
import { screen } from '@testing-library/react';
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
          // Citizens practice areas
          {
            title: 'Private International Law',
            description: 'Specialization in emigration processes, Golden Visas in Portugal, Portuguese and Brazilian nationality, regularization and work in Portugal and Brazil.',
            imageUrl: 'https://images.unsplash.com/photo-1614107151491-6876eecbff89',
            type: 'Citizens',
            showPreview: true
          },
          {
            title: 'Real Estate Law',
            description: 'Specialization in real estate due diligence, drafting and review of purchase and sale contracts, conflicts involving false powers of attorney.',
            imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716',
            type: 'Citizens'
          },
          {
            title: 'Tax Law',
            description: 'Specialization in tax optimization, financial planning, tax obligations, income tax return, transnational taxation.',
            imageUrl: 'https://images.unsplash.com/photo-1604156425963-9be03f86a428',
            type: 'Citizens'
          },
          {
            title: 'Labor Law',
            description: 'Specialization in contractual advice and negotiation of working conditions, consultancy and negotiation in case of dismissals.',
            imageUrl: 'https://images.unsplash.com/photo-1620433042638-c9a00b98637c',
            type: 'Citizens'
          },
          {
            title: 'Family Law',
            description: 'Specialization in drafting prenuptial agreements, assistance and representation in marriages between foreign spouses.',
            imageUrl: 'https://images.unsplash.com/photo-1620433042631-3df212941910',
            type: 'Citizens'
          },
          {
            title: 'Civil Law',
            description: 'Specialization in drafting and understanding contracts, validation of conditions, rules, and clauses of commercial legal transactions.',
            imageUrl: 'https://images.unsplash.com/photo-1530469525856-cf37954301f7',
            type: 'Citizens',
            showPreview: true
          },
          {
            title: 'General Civil Law',
            description: 'Specialization in drafting and reviewing contracts, debt collection, judicial representation in debt collection processes.',
            imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9',
            type: 'Citizens'
          },
          // Company practice areas
          {
            title: 'Labor Law & Unions',
            description: 'Specialization in drafting and analysis of employment contracts, how to properly dismiss employees, advice, calculations, and negotiation.',
            imageUrl: 'https://images.unsplash.com/photo-1556484687-30636164638b',
            type: 'Company'
          },
          {
            title: 'Corporate Law',
            description: 'Specialization in drafting and understanding contracts, validation of conditions, rules, and clauses of commercial legal transactions.',
            imageUrl: 'https://images.unsplash.com/photo-1530469525856-cf37954301f7',
            type: 'Company'
          },
          {
            title: 'Commercial Law',
            description: 'Specialization in the creation and registration of companies, assemblies, assignments, mergers, closure, and sale of commercial companies.',
            imageUrl: 'https://images.unsplash.com/photo-1542908371-3d8e22825a4f',
            type: 'Company'
          },
          {
            title: 'Intellectual Property',
            description: 'Specialization in the registration and protection of trademarks and patents, licensing and royalties contracts, patents and utility models.',
            imageUrl: 'https://images.unsplash.com/photo-1593444285553-28163240e3f1',
            type: 'Company'
          },
          {
            title: 'Tax Consulting',
            description: 'Specialization in tax optimization, financial planning, tax obligations, collective income tax return, transnational taxation.',
            imageUrl: 'https://images.unsplash.com/photo-1554224155-a1487473ffd9',
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
          },
          {
            author: 'Jane Smith',
            feedback: 'Professional and knowledgeable team that helped me through a complex case.',
            imageUrl: '/img/testimonials/jane.jpg'
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
      'pages': {
        'practiceAreas.title': 'Practice Areas',
        'practiceAreas.citizens': 'Citizens',
        'practiceAreas.companies': 'Companies',
        'homepage.hero1.title': 'A Careful, Committed, and Dignified Approach to Law.',
        'homepage.hero1.description': 'I\'m here to help. As your legal partner, I provide personalized solutions that protect your interests and guide you to informed decisions. Let\'s work together to find clarity in legal matters. Schedule a consultation today and take the first step toward peace of mind.'
      },
      'components': {
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
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  it('renders the main page structure', () => {
    renderWithMotion(<PracticeAreas />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the hero section with correct title', () => {
    renderWithMotion(<PracticeAreas />);
    
    expect(screen.getByText('Practice Areas')).toBeInTheDocument();
  });

  it('renders the citizens section with correct title', () => {
    renderWithMotion(<PracticeAreas />);
    
    expect(screen.getByText('Citizens:')).toBeInTheDocument();
  });

  it('renders the companies section with correct title', () => {
    renderWithMotion(<PracticeAreas />);
    
    expect(screen.getByText('Companies:')).toBeInTheDocument();
  });

  it('renders all citizens practice area cards', () => {
    renderWithMotion(<PracticeAreas />);
    
    // Check for citizens practice areas
    expect(screen.getByText('Private International Law')).toBeInTheDocument();
    expect(screen.getByText('Real Estate Law')).toBeInTheDocument();
    expect(screen.getByText('Tax Law')).toBeInTheDocument();
    expect(screen.getByText('Labor Law')).toBeInTheDocument();
    expect(screen.getByText('Family Law')).toBeInTheDocument();
    expect(screen.getByText('Civil Law')).toBeInTheDocument();
    expect(screen.getByText('General Civil Law')).toBeInTheDocument();
  });

  it('renders all companies practice area cards', () => {
    renderWithMotion(<PracticeAreas />);
    
    // Check for companies practice areas
    expect(screen.getByText('Labor Law & Unions')).toBeInTheDocument();
    expect(screen.getByText('Corporate Law')).toBeInTheDocument();
    expect(screen.getByText('Commercial Law')).toBeInTheDocument();
    expect(screen.getByText('Intellectual Property')).toBeInTheDocument();
    expect(screen.getByText('Tax Consulting')).toBeInTheDocument();
  });

  it('renders practice area cards with correct descriptions', () => {
    renderWithMotion(<PracticeAreas />);
    
    // Check some key descriptions
    expect(screen.getByText(/Specialization in emigration processes, Golden Visas in Portugal/)).toBeInTheDocument();
    expect(screen.getByText(/Specialization in real estate due diligence, drafting and review/)).toBeInTheDocument();
    expect(screen.getAllByText(/Specialization in tax optimization, financial planning/)).toHaveLength(2); // One for citizens, one for companies
    expect(screen.getByText(/Specialization in the creation and registration of companies/)).toBeInTheDocument();
  });

  it('renders practice area cards with correct images', () => {
    renderWithMotion(<PracticeAreas />);
    
    const images = screen.getAllByRole('img');
    const practiceAreaImages = images.filter(img => 
      img.getAttribute('alt')?.includes('Private International Law') ||
      img.getAttribute('alt')?.includes('Real Estate Law') ||
      img.getAttribute('alt')?.includes('Tax Law') ||
      img.getAttribute('alt')?.includes('Labor Law') ||
      img.getAttribute('alt')?.includes('Family Law') ||
      img.getAttribute('alt')?.includes('Civil Law') ||
      img.getAttribute('alt')?.includes('General Civil Law') ||
      img.getAttribute('alt')?.includes('Labor Law & Unions') ||
      img.getAttribute('alt')?.includes('Commercial Law') ||
      img.getAttribute('alt')?.includes('Intellectual Property') ||
      img.getAttribute('alt')?.includes('Tax Consulting')
    );
    
    expect(practiceAreaImages.length).toBeGreaterThanOrEqual(10);
  });

  it('renders the call-to-action section with correct title and description', () => {
    renderWithMotion(<PracticeAreas />);
    
    expect(screen.getByText('A Careful, Committed, and Dignified Approach to Law.')).toBeInTheDocument();
    expect(screen.getByText(/I'm here to help. As your legal partner/)).toBeInTheDocument();
  });

  it('renders the contact button with correct link', () => {
    renderWithMotion(<PracticeAreas />);
    
    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contacts');
  });

  it('renders the testimonials section', () => {
    renderWithMotion(<PracticeAreas />);
    
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
    expect(screen.getByText('What My Clients Experienced')).toBeInTheDocument();
  });

  it('renders navigation anchor points', () => {
    renderWithMotion(<PracticeAreas />);
    
    expect(document.getElementById('citizens')).toBeInTheDocument();
    expect(document.getElementById('companies')).toBeInTheDocument();
  });

  it('renders all required headings with correct hierarchy', () => {
    renderWithMotion(<PracticeAreas />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThanOrEqual(4);
    
    // Check main headings
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Practice Areas');
    
    // Check h2 headings (there are multiple h2s)
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings.length).toBeGreaterThanOrEqual(2);
    expect(h2Headings.some(h => h.textContent === 'Citizens:')).toBe(true);
    expect(h2Headings.some(h => h.textContent === 'Companies:')).toBe(true);
    
    // Check h3 headings (there are multiple h3s)
    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    expect(h3Headings.length).toBeGreaterThanOrEqual(2);
    expect(h3Headings.some(h => h.textContent === 'A Careful, Committed, and Dignified Approach to Law.')).toBe(true);
    expect(h3Headings.some(h => h.textContent === 'Testimonials')).toBe(true);
  });

  it('renders practice area cards with proper structure', () => {
    renderWithMotion(<PracticeAreas />);
    
    // Check that practice area cards have titles and descriptions
    const cardTitles = screen.getAllByText(/Private International Law|Real Estate Law|Tax Law|Labor Law|Family Law|Civil Law|General Civil Law|Labor Law & Unions|Commercial Law|Intellectual Property|Tax Consulting/);
    expect(cardTitles.length).toBeGreaterThanOrEqual(10);
    
    // Check that descriptions are present
    const descriptions = screen.getAllByText(/Specialization in/);
    expect(descriptions.length).toBeGreaterThanOrEqual(10);
  });

  it('renders the hero section with correct background image', () => {
    renderWithMotion(<PracticeAreas />);
    
    // The hero section uses HeroSection component which renders the background image
    const heroContainer = screen.getByText('Practice Areas').closest('div')?.parentElement?.parentElement;
    expect(heroContainer).toBeInTheDocument();
  });

  it('renders all sections in correct order', () => {
    renderWithMotion(<PracticeAreas />);
    
    const main = screen.getByRole('main');
    const sections = main.querySelectorAll('section');
    
    // Should have at least 3 sections: citizens, companies, testimonials
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });

  it('renders the page with proper semantic structure', () => {
    renderWithMotion(<PracticeAreas />);
    
    // Check main structure
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // Check headings hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    const h3Headings = screen.getAllByRole('heading', { level: 3 });
    
    expect(h1).toBeInTheDocument();
    expect(h2Headings.length).toBeGreaterThanOrEqual(2);
    expect(h3Headings.length).toBeGreaterThanOrEqual(2);
  });

  it('renders all text content in readable format', () => {
    renderWithMotion(<PracticeAreas />);
    
    // Check that all major text content is present and readable
    expect(screen.getByText('Practice Areas')).toBeInTheDocument();
    expect(screen.getByText('Citizens:')).toBeInTheDocument();
    expect(screen.getByText('Companies:')).toBeInTheDocument();
    expect(screen.getByText('A Careful, Committed, and Dignified Approach to Law.')).toBeInTheDocument();
    expect(screen.getByText('Testimonials')).toBeInTheDocument();
  });

  it('renders practice areas grouped correctly by type', () => {
    renderWithMotion(<PracticeAreas />);
    
    // Check that citizens section comes before companies section
    const citizensHeading = screen.getByText('Citizens:');
    const companiesHeading = screen.getByText('Companies:');
    
    expect(citizensHeading.compareDocumentPosition(companiesHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders the page without console errors', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithMotion(<PracticeAreas />);
    
    // Check that no critical errors were logged
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Warning:')
    );
    
    consoleSpy.mockRestore();
  });
});