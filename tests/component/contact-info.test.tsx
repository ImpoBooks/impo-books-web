import { beforeEach, describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { contactItems } from '@/constants/contact-items';
import { socialLinks } from '@/constants/social-links';
import ContactInfo from '@/modules/contacts/components/contact-info';

describe('Contact Info Component - Unit Tests', () => {
  beforeEach(() => {
    render(<ContactInfo />);
  });

  it('should render all contact blocks', () => {
    const allContactBlock = screen.getAllByTestId('contact-block');
    expect(allContactBlock).toHaveLength(2);
  });

  it('should render the title', () => {
    const contactInfoTitle = screen.getByText('Контактна інформація');
    expect(contactInfoTitle).toBeInTheDocument();
  });

  it('should render all paragraphs of contact block', () => {
    const allParagraphs = screen.getAllByTestId('contact-item-paragraph');
    expect(allParagraphs).toHaveLength(contactItems.length);
  });

  it('should render all icons from contactItems and socialLinks', () => {
    const icons = screen.getAllByRole('img');
    expect(icons).toHaveLength(contactItems.length + socialLinks.length);
  });

  it('should render a link for each social network', () => {
    const links = screen.getAllByRole('link');
    socialLinks.forEach(({ href }, index) => {
      expect(links[index]).toHaveAttribute('href', href);
    });
  });
});
