import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceSection from '@/components/PracticeAreas/ServiceSection';

const baseProps = {
  slug: 'family-law',
  title: 'Family Law',
  description: 'Prenuptial agreements, divorce, and parental regulation.',
  imageUrl: 'https://images.unsplash.com/photo-1620433042631-3df212941910',
  typeLabel: 'Citizens'
};

describe('ServiceSection', () => {
  it('renders the title, description, badge, and image', () => {
    render(<ServiceSection {...baseProps} />);

    expect(screen.getByRole('heading', { name: 'Family Law' })).toBeInTheDocument();
    expect(
      screen.getByText('Prenuptial agreements, divorce, and parental regulation.')
    ).toBeInTheDocument();
    expect(screen.getByText('Citizens')).toBeInTheDocument();

    const image = screen.getByRole('img', { name: 'Family Law' });
    expect(image).toHaveAttribute('src', baseProps.imageUrl);
  });

  it('exposes the slug as an anchor id', () => {
    const { container } = render(<ServiceSection {...baseProps} />);
    expect(container.querySelector('#family-law')).toBeInTheDocument();
  });

  it('places the image on the left by default (flex-row)', () => {
    render(<ServiceSection {...baseProps} imagePosition="left" />);
    const article = screen.getByRole('heading', { name: 'Family Law' }).closest('article');
    expect(article).toHaveClass('lg:flex-row');
    expect(article).not.toHaveClass('lg:flex-row-reverse');
  });

  it('reverses the columns when the image is on the right', () => {
    render(<ServiceSection {...baseProps} imagePosition="right" />);
    const article = screen.getByRole('heading', { name: 'Family Law' }).closest('article');
    expect(article).toHaveClass('lg:flex-row-reverse');
  });

  it('omits the badge when no type label is provided', () => {
    render(<ServiceSection {...baseProps} typeLabel={undefined} />);
    expect(screen.queryByText('Citizens')).not.toBeInTheDocument();
  });
});
