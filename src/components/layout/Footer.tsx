import { Github, Linkedin, ArrowUpRight } from 'lucide-react';
import MLCodexLogo from '@/components/ui/MLCodexLogo';
import XIcon from '@/components/ui/XIcon';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    learn: [
      { label: 'Docs', href: '/docs', internal: true },
      { label: 'Projects', href: '#' },
      { label: 'Tutorials', href: '#' },
      { label: 'Examples', href: '#' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'GitHub', href: 'https://github.com/lokeshpanthangi/MLCodex', external: true },
      { label: 'Changelog', href: '#' },
    ],
    community: [
      { label: 'Discord', href: '#', external: true },
      { label: 'Blog', href: '#' },
      { label: 'X (Twitter)', href: 'https://x.com', external: true },
      { label: 'Newsletter', href: '#' },
    ],
  };

  return (
    <footer className="border-t border-border/50 py-16 bg-background relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <MLCodexLogo size={28} className="text-foreground" />
              <span className="text-xl font-semibold tracking-tight">
                <span className="text-foreground">MLCodex</span>
                <span className="text-muted-foreground font-normal">Docs</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Learn machine learning from first principles. 
              No black boxes, just pure understanding.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: 'https://github.com/lokeshpanthangi/MLCodex' },
                { icon: XIcon, href: 'https://x.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium mb-5 text-foreground capitalize">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <Link 
                        to={link.href} 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        {link.external && (
                          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MLCodex. Built with passion for developers.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
