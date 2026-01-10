import { Brain, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-semibold text-foreground">MLEdu</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Learn machine learning from first principles.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4 text-foreground">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/curriculum" className="text-muted-foreground hover:text-foreground transition-colors">Curriculum</Link></li>
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Projects</span></li>
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Tutorials</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Documentation</span></li>
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">API Reference</span></li>
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">GitHub</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-foreground">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Discord</span></li>
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Blog</span></li>
              <li><span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Twitter</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          © 2024 MLEdu. Built with ❤️ for developers.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
