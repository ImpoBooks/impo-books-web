import { socialLinks } from '@/constants/social-links';

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

export default SocialLinks;
