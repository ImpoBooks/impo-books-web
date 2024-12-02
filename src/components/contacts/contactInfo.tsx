import { contactItems } from '@/constants/contact-items';
import { socialLinks } from '@/constants/social-links';

const ContactInfo = () => {
  const SocialLinks = () => {
    return (
      <div className="flex space-x-4" data-testid="contact-block">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <a key={label} href={href} className="text-black hover:text-gray-600">
            <Icon className="h-6 w-6" role="img" />
            <span className="sr-only">{label}</span>
          </a>
        ))}
      </div>
    );
  };

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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Контактна інформація</h3>
        <ContactItems />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Слідкуйте за нами</h3>
        <SocialLinks />
      </div>
    </div>
  );
};

export default ContactInfo;
