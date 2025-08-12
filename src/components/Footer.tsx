import Container from './UI/Container';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, href: 'mailto:support@movemate.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img src="/images/logo.svg" alt="MoveMate" className="h-10 invert" />
              <span className="ml-2 text-xl font-bold">MoveMate</span>
            </a>
            <p className="mt-2 text-gray-400 max-w-md">
              Connecting truck drivers with people who need to move items.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© 2025 MoveMate. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Contact Us</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;