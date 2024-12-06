import { contactItems } from '@/constants/contact-items';

const ContactItems = () => {
  return (
    <div className="space-y-2" data-testid="contact-block">
      {contactItems.map(({ icon: Icon, text }, index) => (
        <p
          key={index}
          className="flex items-center"
          data-testid="contact-item-paragraph"
        >
          <Icon className="mr-2 h-5 w-5" role="img" />
          {text}
        </p>
      ))}
    </div>
  );
};

export default ContactItems;
