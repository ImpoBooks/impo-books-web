import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import ContactInfo from '@/components/contacts/contactInfo';
import { contactItems } from '@/constants/contact-items';
import { socialLinks } from '@/constants/social-links';

const MockPage = () => (
  <div>
    <h1>Наші контакти</h1>
    <ContactInfo />
  </div>
);

describe('Contact Info Component - Integration Tests', () => {
  beforeEach(() => {
    render(<MockPage />);
  });

  it('should render correctly on a mock page', () => {
    expect(screen.getByText('Наші контакти')).toBeInTheDocument();

    contactItems.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    socialLinks.forEach(({ href, label }) => {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('should render social media icons and links interactively', () => {
    socialLinks.forEach(({ label }) => {
      const iconLink = screen.getByRole('link', { name: label });
      expect(iconLink).toBeInTheDocument();
      expect(iconLink).toHaveAccessibleName(label);
    });
  });

  it('should render the correct number of contact items and social links', () => {
    expect(screen.getAllByTestId('contact-item-paragraph')).toHaveLength(
      contactItems.length,
    );
    expect(screen.getAllByRole('link')).toHaveLength(socialLinks.length);
  });

  it('should allow clicking on social links', () => {
    const firstLink = screen.getByRole('link', { name: socialLinks[0].label });
    fireEvent.click(firstLink);
    expect(firstLink).toBeInTheDocument();
  });
});
