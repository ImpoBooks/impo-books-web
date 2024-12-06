import SocialLinks from './social-links';

import ContactItems from '@/modules/contacts/components/contact-items';

const ContactInfo = () => {
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
