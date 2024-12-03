import { render, screen } from '@testing-library/react';

import ContactForm from '@/components/contacts/contactForm';
import { formItems } from '@/constants/form-items';

describe('Contact Form Component - Unit Tests', () => {
  it('should render all form fields with correct labels, ids, placeholders', () => {
    render(<ContactForm />);
    formItems.forEach(({ id, label, placeholder }) => {
      const input = screen.getByLabelText(label);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', id);
      expect(input).toHaveAttribute('placeholder', placeholder);
    });
  });

  it('should render a submit button with correct text', () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button', { name: 'Відправити' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});
