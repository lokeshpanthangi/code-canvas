import { Link, useLocation } from 'react-router-dom';
import { Brain, Search, Github, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/30 -z-10" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              MLEdu<span className="text-muted-foreground">Docs</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`flex items-center gap-1 text-sm transition-colors ${
                location.pathname === '/'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
              <ChevronDown className="w-3 h-3" />
            </Link>
            <Link
              to="/curriculum"
              className={`text-sm transition-colors ${
                location.pathname === '/curriculum'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Curriculum
            </Link>
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Projects
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Community
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search...</span>
              <kbd className="ml-4 px-2 py-0.5 text-xs rounded bg-muted text-muted-foreground border border-border">
                ⌘K
              </kbd>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            <Button variant="hero" size="sm">
              Start Building
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
